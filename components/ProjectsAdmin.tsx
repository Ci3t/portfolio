"use client";
import { deleteProject, getProjects } from "@/lib/action";

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
  iconLists: TechStack[];
}
const ProjectsAdmin = async ({
  id,
  title,
  des,
  img_url,
  iconLists,
}: ProjectsAdminProps) => {
  const handleDelete = async (e: any) => {
    console.log(e.target);

    if (!id) return;

    try {
      await deleteProject(id); // Indirectly call server action
      console.log(`Project with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  mb-4 dark:bg-black-100 border  md:max-w-xl md:flex-row">
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
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {des}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-300">
            {/* {updatedAt && updatedAt} */}
          </p>
          <div>
            {iconLists?.map((icon, index) => (
              <img
                key={index}
                src={icon.secure_url}
                alt={icon.name}
                className="w-6 h-6"
              />
            ))}
          </div>
        </div>
        <div className=" flex flex-row justify-center items-center gap-3 p-3">
          <button>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
