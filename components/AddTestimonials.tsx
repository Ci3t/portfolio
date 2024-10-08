"use client";
import {
  addTestimonials,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "@/lib/testimonials.action";
import { Label } from "@radix-ui/react-label";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/textarea";

interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  title: string;
}

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await addTestimonials(formData);
      setIsAdding(false);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to add testimonial:", error);
    }
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    try {
      await updateTestimonial(id, formData);
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
      console.log(`data`, data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);
  return (
    <div className="p-6  relative">
      <div className="flex mb-6 gap-3">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="flex items-center px-4 py-2 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </button>
      </div>

      {isAdding && (
        <div className="absolute inset-0 flex justify-center items-center">
          <TestiModal
            className="relative z-20 rounded-lg shadow-md p-2   w-[60rem]"
            setIsAdding={setIsAdding}
            handleSubmit={handleSubmit}
          />
        </div>
      )}

      <div className="">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="mb-4 rounded-lg shadow-md p-6  border-gray-200 bg-purple-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-violet-400/70"
          >
            {editingId === testimonial._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(testimonial._id, new FormData(e.currentTarget));
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label
                    htmlFor={`name-${testimonial._id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id={`name-${testimonial._id}`}
                    name="name"
                    defaultValue={testimonial.name}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor={`title-${testimonial._id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id={`title-${testimonial._id}`}
                    name="title"
                    defaultValue={testimonial.title}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor={`quote-${testimonial._id}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quote
                  </label>
                  <textarea
                    id={`quote-${testimonial._id}`}
                    name="quote"
                    defaultValue={testimonial.quote}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(testimonial._id)}
                      className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-violet-300 font-medium">
                  {testimonial.quote}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
interface TestiModalProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}
const TestiModal: React.FC<TestiModalProps> = ({
  handleSubmit,
  setIsAdding,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <div className="mb-6 e rounded-lg shadow-md p-6 bg-purple-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-violet-400/70">
        <h1 className="heading">Testimonials Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </Label>
            <Input
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title
            </Label>
            <Input
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="quote"
              className="block text-sm font-medium text-white"
            >
              Quote
            </Label>
            <Textarea
              id="quote"
              name="quote"
              required
              className="w-full px-3 py-2 border border-violet-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-violet-400 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
