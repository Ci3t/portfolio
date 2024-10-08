import { getProjects } from "@/lib/action";
import { FaArrowTurnUp } from "react-icons/fa6";
import { PinContainer } from "./ui/3d-pin";
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
const RecentProjects = async () => {
  const projects = (await getProjects()) as Project[];
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple"> recent projects</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map(({ _id, title, des, img_url, iconLists, link }) => (
          <div
            key={_id}
            className="lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw] sm:h-[41rem] h-[32rem]"
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden  sm:h-[40vh] h-[30vh] mb-10">
                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
                  <img src="/bg.png" alt="bg-img" />
                </div>
                <img
                  src={img_url}
                  alt={title}
                  className="z-10 absolute bottom-0 object-cover h-full w-full"
                />
              </div>
              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {title}
              </h1>
              <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
                {des}
              </p>
              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {iconLists.map((icon, index) => (
                    <div
                      key={icon._id}
                      className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index * 2}px)`,
                      }}
                    >
                      <img
                        src={icon.secure_url}
                        alt={icon.name}
                        className="p-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    Check Live Site
                  </p>
                  <FaArrowTurnUp className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
