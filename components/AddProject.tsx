"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";

import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/textarea";
import { addProject } from "@/lib/action";
import Image from "next/image";

interface CloudinaryResourceInfo {
  public_id: string;
  secure_url: string;
}
export function AddProject() {
  const [resource, setResource] = useState<CloudinaryResourceInfo | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submission started");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Log all form data
    // console.log("All form data:");
    // logFormData(formData);

    if (resource) {
      console.log("Resource data:", resource);
      formData.set("img_id", resource.public_id);
      formData.set("img_url", resource.secure_url);
    } else {
      console.warn("No image was uploaded to Cloudinary");
    }

    // Log form data again after adding Cloudinary info
    // console.log("Form data after adding Cloudinary info:");
    // logFormData(formData);

    try {
      const response = await addProject(formData);
      console.log("Server response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Helper function to log FormData contents
  //   const logFormData = (formData: FormData) => {
  //     const entries = Array.from(formData.entries());
  //     entries.forEach(([key, value]) => {
  //       console.log(key, value);
  //     });
  //   };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Add Project
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Project Title"
              type="text"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="imgUrl">Live Website</Label>
          <Input name="imgUrl" id="imgUrl" placeholder="••••••••" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="img_url">img</Label>
          {/* <Input
            name="img"
            id="img"
            placeholder="••••••••"
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) handleFileUpload(selectedFile);
            }}
          /> */}
          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(result) => {
              const info = result?.info as CloudinaryResourceInfo;
              console.log("Cloudinary upload success:", info);
              setResource(info);
            }}
            onQueuesEnd={(result, { widget }) => {
              widget.close();
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setResource(undefined);
                open();
              }
              return <button onClick={handleOnClick}>Upload an Image</button>;
            }}
          </CldUploadWidget>
          {resource?.secure_url && (
            <img
              className="w-[200px]"
              src={resource?.secure_url || ""}
              alt={"preview"}
            />
          )}
        </LabelInputContainer>
        {/* <FileUp /> */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="icon">Icons</Label>
          <Input name="icon" id="icon" placeholder="••••••••" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="des">Description</Label>
          <Textarea id="des" name="des" placeholder="Describe the Project" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] cursor-pointer"
          type="submit"
          disabled={!resource}
        >
          Submit &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
