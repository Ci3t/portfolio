import ProjectsAdmin from "@/components/ProjectsAdmin";
import { getProjects } from "@/lib/action";
import Link from "next/link";
import React from "react";

const Projects = async () => {
  const projects = await getProjects(); // Server-side fetch

  return (
    <div>
      {projects.map((p, i) => (
        <div className="flex flex-col gap-3">
          <ProjectsAdmin
            id={p._id}
            key={p._id}
            title={p.title}
            des={p.des}
            img_url={p.img_url}
          />
        </div>
        // <div key={i}>
        //   <h1>{p.title}</h1>
        //   <p>{p.des}</p>
        // </div>
      ))}
    </div>
  );
};

export default Projects;
