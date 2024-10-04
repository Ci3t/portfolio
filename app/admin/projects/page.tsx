import ProjectsAdmin from "@/components/ProjectsAdmin";
import { getProjects } from "@/lib/action";
import Link from "next/link";
import React from "react";
interface TechStack {
  _id: string;
  name: string;
  secure_url: string;
}

interface Project {
  _id: string;
  title: string;
  des: string;
  img_url: string;
  link: string;
  img_id?: string;
  iconLists: TechStack[];
  createdAt?: Date;
  updatedAt?: Date;
}
const Projects = async () => {
  const projects = (await getProjects()) as Project[]; // Server-side fetch
  console.log(projects);

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <div key={project._id} className="flex flex-col gap-3">
          <ProjectsAdmin
            id={project._id}
            title={project.title}
            des={project.des}
            img_url={project.img_url}
            iconLists={project.iconLists}
            link={project.link}
          />
        </div>
      ))}
    </div>
  );
};

export default Projects;
