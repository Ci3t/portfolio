"use client";
import { getProjects } from "@/lib/action";
import React, { useState } from "react";

const ProjectsAdmin = async () => {
  const [projects, setProjects] = useState<any>([]);

  const fetchProjects = async () => {
    const project = await getProjects();
    setProjects(project);
  };
  return (
    <div>
      {projects.map((p, i) => (
        <h1>{p.title}</h1>
      ))}
    </div>
  );
};

export default ProjectsAdmin;
