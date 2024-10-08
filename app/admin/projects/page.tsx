import ProjectsAdmin from "@/components/ProjectsAdmin";
import { BackgroundBeamsWithCollision } from "@/components/ui/BackgroundBeamsWithCol";
import { getProjects } from "@/lib/action";
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
    <>
      <div className="bg-[radial-gradient(circle,_#242424_10%,_transparent_11%),radial-gradient(circle_at_bottom_left,_#242424_5%,_transparent_6%),radial-gradient(circle_at_bottom_right,_#242424_5%,_transparent_6%),radial-gradient(circle_at_top_left,_#242424_5%,_transparent_6%),radial-gradient(circle_at_top_right,_#242424_5%,_transparent_6%)] [background-size:1em_1em] bg-[#000000]">
        {/* //! GLOW */}
        <div className="absolute top-2/4 left-2/4 w-full bg-[radial-gradient(circle,_rgba(123,_67,_255,_0.6),_transparent_60%)] filter blur-[100px] -translate-x-[70%] -translate-y-[50%] z-0 h-full"></div>

        {/* //!top square */}

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="flex flex-col gap-4 items-end">
          <BackgroundBeamsWithCollision className=" ">
            <div className="grid  gap-2 lg:grid-cols-2 xl:grid-cols-3  lg:grid-rows-4 p-4 md:pt-6 grid-cols-1 ">
              {projects.map((project) => (
                <div key={project._id} className="md:flex ">
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
          </BackgroundBeamsWithCollision>
        </div>
      </div>
    </>
  );
};

export default Projects;
