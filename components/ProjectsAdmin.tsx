"use client";
import { Separator } from "@/components/ui/separator";
import { deleteProject, getTechOptions, updateProject } from "@/lib/action";
import { useEffect, useState } from "react";
import ProjectForm from "./UpdateProject";
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
  iconLists = [],
}: ProjectsAdminProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techOptions, setTechOptions] = useState<TechStack[]>([]);

  useEffect(() => {
    const loadTechOptions = async () => {
      if (!isModalOpen) return;
      try {
        const options = await getTechOptions();
        setTechOptions(options);
      } catch (error) {
        console.error("Error loading tech options:", error);
      }
    };

    loadTechOptions();
  }, [isModalOpen]);

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

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProject = async (
    updatedData: any
  ): Promise<{ error?: string }> => {
    try {
      await updateProject(id, updatedData);
      console.log("Project updated successfully");
      setIsModalOpen(false);
      return {}; // No error, return an empty object
    } catch (error) {
      console.error("Error updating project:", error);
      return { error: (error as Error).message }; // Return an error object
    }
  };

  return (
    <div className="w-full">
      {/* Project card */}

      <div className="flex flex-col rounded-lg shadow-lg mb-2 bg-purple-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-violet-400/70 ">
        <img
          className=" w-full h-40 object-cover rounded-t-lg md:h-48 lg:h-56"
          src={img_url}
          alt={title}
        />
        <div className="flex flex-col justify-start p-2 md:flex-wrap">
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
          <div className="flex justify-between items-center sm:flex-wrap-reverse">
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
            <div className="flex flex-row justify-center items-center gap-2 ">
              <button
                className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                onClick={handleUpdateClick}
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
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
              link,
              iconLists: iconLists.map((icon) => icon.name).join(", "),
            }}
            onSave={handleUpdateProject}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProjectsAdmin;
