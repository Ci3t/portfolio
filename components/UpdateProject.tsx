"use client";
import { useState, useTransition } from "react";

interface ProjectFormProps {
  initialData: {
    title: string;
    des: string;
    img_url: string;
    icon: string;
  };
  onSave: (data: any) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSave }) => {
  const [title, setTitle] = useState(initialData.title);
  const [des, setDes] = useState(initialData.des);
  const [imgUrl, setImgUrl] = useState(initialData.img_url);
  const [icon, setIcon] = useState(initialData.icon);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { title, des, img_url: imgUrl, icon };

    console.log("Submitting updated data:", updatedData); // Log the data being sent

    startTransition(() => {
      try {
        onSave(updatedData);
      } catch (error) {
        console.error("Error saving the project:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={des}
          onChange={(e) => setDes(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Icons (comma separated)</label>
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProjectForm;
