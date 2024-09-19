import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import ShimmerButton from "./ui/ShimmerButton";
import { FaArrowTrendUp } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 h-screen md:-left-32 md:-top-20 "
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw] "
          fill="cyan"
        />
        <Spotlight
          className="top-28 left-80 h-[80vh] w-[50vw] "
          fill="violet"
        />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute top-0 left-0 flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Passionate Coding
          </h2>
          <TextGenerateEffect
            className="uppercase text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Has the ability to turn caffeine into code"
          />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-xl">
            Hello I&apos;m RaNi , Passionate Fullstack Developer
          </p>
          <ShimmerButton
            title={"Showcase"}
            position="right"
            icon={<FaArrowTrendUp />}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
