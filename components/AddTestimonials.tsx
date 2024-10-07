"use client";
import {
  addTestimonials,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "@/lib/testimonials.action";
import { Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";

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
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <button
          onClick={() => setIsAdding((prev) => !prev)}
          className="flex items-center px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </button>
      </div>

      {isAdding && (
        <div className="absolute inset-0 flex justify-center items-center">
          <TestiModal
            className="relative  rounded-lg shadow-md p-2   w-[60rem]"
            setIsAdding={setIsAdding}
            handleSubmit={handleSubmit}
          />
        </div>
      )}

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
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
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                <p className="text-gray-600">{testimonial.quote}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const TestiModal = ({ handleSubmit, setIsAdding, className }) => {
  return (
    <div className={`${className}`}>
      <div className="mb-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="quote"
              className="block text-sm font-medium text-gray-700"
            >
              Quote
            </label>
            <textarea
              id="quote"
              name="quote"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
