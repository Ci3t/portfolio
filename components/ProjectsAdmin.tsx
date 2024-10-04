"use client";
import { deleteProject, updateProject } from "@/lib/action";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ProjectForm from "./UpdateProject"; // Assume this is your update form component
import { Modal } from "./ui/UpdateModal";

interface TechStack {
  _id: string;
  name: string;
  secure_url: string;
}

interface ProjectsAdminProps {
  id: string;
  title: string;
  des: string;
  img_url: string;
  link: string;
  iconLists: TechStack[];
}

const ProjectsAdmin = ({
  id,
  title,
  des,
  link,
  img_url,
  iconLists,
}: ProjectsAdminProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Handle delete
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id) return;
    try {
      await deleteProject(id);
      console.log(`Project with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Open the modal
  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle the update logic
  const handleUpdateProject = async (updatedData: any) => {
    try {
      await updateProject(id, updatedData);
      console.log("Project updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      {/* Project card */}
      <div className="flex flex-col justify-between rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-4 dark:bg-black-100 border md:max-w-xl md:flex-row">
        <img
          className="h-60 w-full rounded-t-lg object-cover md:h-auto md:w-28 md:rounded-none md:rounded-l-lg"
          src={
            img_url ||
            "https://res.cloudinary.com/dkvjoubvz/image/upload/v1727713634/ycz3zaya8pntopsndheg.jpg"
          }
          alt={title}
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {title}
          </h5>
          <Separator className="mb-1 bg-gray-200 w-full" />
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {des}
          </p>
          <Separator className="mb-2 bg-gray-200 w-full" />
          <p>{link}</p>
          <Separator className="mb-2 bg-gray-200 w-full" />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {iconLists?.map((icon, index) => (
                <img
                  key={icon._id}
                  src={icon.secure_url}
                  alt={icon.name}
                  className="border border-white/[0.2] rounded-full bg-black w-6 h-6 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index * 2}px)`,
                  }}
                />
              ))}
            </div>
            <div className="flex flex-row justify-center items-center gap-3 p-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-xl mb-4">Update Project</h2>
          <ProjectForm
            initialData={{
              title,
              des,
              img_url,
              icon: iconLists.map((icon) => icon.name).join(", "),
            }}
            onSave={handleUpdateProject}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProjectsAdmin;
