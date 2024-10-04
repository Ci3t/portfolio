"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/textarea";
import { addProject, checkTechStackIcons } from "@/lib/action";
import Image from "next/image";
import TagInput from "./Tags";

interface CloudinaryResourceInfo {
  public_id: string;
  secure_url: string;
}

export function AddProject() {
  const [resource, setResource] = useState<CloudinaryResourceInfo | undefined>(
    undefined
  );
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [missingIcons, setMissingIcons] = useState<string[]>([]);
  const [iconResources, setIconResources] = useState<CloudinaryResourceInfo[]>(
    []
  ); // for tech stack icons

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setMissingIcons([]); // Clear missing icons from previous run
    console.log("Form submission started");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("icon", tags.join(","));
    // Convert the comma-separated tags (icons) into an array
    const iconInput = formData.get("icon") as string;
    const iconArray = iconInput
      ? iconInput.split(",").map((tag) => tag.trim().toLowerCase()) // Convert to lowercase
      : [];

    try {
      // Check if all tech stack icons exist
      const result = await checkTechStackIcons(iconArray); // Call server action
      if (result.missingIcons.length > 0) {
        setMissingIcons(result.missingIcons); // Display missing icons if any
        setError(`Missing icons: ${result.missingIcons.join(", ")}`);
        return; // Don't submit the form if icons are missing
      }

      // Add the tech stack icons to the FormData
      formData.set("iconResources", JSON.stringify(iconResources));
      if (resource) {
        formData.set("img_id", resource.public_id);
        formData.set("img_url", resource.secure_url);
      } else {
        console.warn("No image was uploaded to Cloudinary");
      }

      const response = await addProject(formData);
      console.log("Server response:", response);
      setError(null); // Clear errors on successful submission
    } catch (error: any) {
      if (error.message) {
        setError(`Failed to add project: ${error.message}`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Add Project
      </h2>

      {/* Error Section */}
      {error && (
        <div
          className="bg-white text-red-500 text-lg"
          style={{ marginTop: "10px" }}
        >
          {error}
        </div>
      )}

      {/* Missing Icons Section */}
      {missingIcons.length > 0 && (
        <div className="text-red-500">
          <p>Missing the following icons:</p>
          <ul>
            {missingIcons.map((icon, idx) => (
              <li key={idx}>{icon}</li>
            ))}
          </ul>
        </div>
      )}

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
          <Label htmlFor="link">Live Website</Label>
          <Input name="link" id="link" placeholder="••••••••" type="text" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="img_url">img</Label>
          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(result) => {
              const info = result?.info as CloudinaryResourceInfo;
              setResource(info);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => {
                  setResource(undefined); // Clear the resource
                  open(); // Open the Cloudinary widget
                }}
              >
                Upload an Image
              </button>
            )}
          </CldUploadWidget>
          {resource?.secure_url && (
            <img
              className="w-[200px]"
              src={resource?.secure_url || ""}
              alt={"preview"}
            />
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="icon">Icons</Label>
          <TagInput tags={tags} setTags={setTags} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="techIcon">
            Upload Tech Stack Icon (for new tags)
          </Label>
          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(result) => {
              const info = result?.info as CloudinaryResourceInfo;
              setIconResources((prevIcons) => [...prevIcons, info]); // Add each new icon to the state
            }}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()}>
                Upload an Icon
              </button>
            )}
          </CldUploadWidget>

          {/* Display uploaded tech stack icons */}
          {iconResources.map((icon, idx) => (
            <img
              key={idx}
              className="w-[100px]"
              src={icon.secure_url}
              alt={`icon-${idx}`}
            />
          ))}
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

export const LabelInputContainer = ({
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
