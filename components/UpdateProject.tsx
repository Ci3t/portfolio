"use client";
import { useState } from "react";

interface ProjectFormProps {
  initialData: {
    title: string;
    des: string;
    img_url: string;
    link: string;
    iconLists: string;
  };
  onSave: (data: any) => Promise<{ error?: string }>;
}

const ProjectForm = ({ initialData, onSave }: ProjectFormProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [des, setDes] = useState(initialData.des);
  const [imgUrl, setImgUrl] = useState(initialData.img_url);
  const [link, setLink] = useState(initialData.link);
  const [iconList, setIconList] = useState(initialData.iconLists);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setIsSubmitting(true);

    try {
      // Convert comma-separated icon list to array and trim whitespace
      const iconArray = iconList
        .split(",")
        .map((icon) => icon.trim())
        .filter(Boolean);

      const updatedData = {
        title,
        des,
        img_url: imgUrl,
        link,
        iconLists: iconArray,
      };

      const result = await onSave(updatedData);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
          <strong className="font-medium">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex flex-col">
        <label className="mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Description</label>
        <textarea
          value={des}
          onChange={(e) => setDes(e.target.value)}
          className="border p-2 rounded min-h-[100px]"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Image URL</label>
        <input
          type="url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Technologies (comma-separated)</label>
        <input
          type="text"
          value={iconList}
          onChange={(e) => setIconList(e.target.value)}
          className="border p-2 rounded"
          placeholder="react, typescript, tailwind"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProjectForm;
