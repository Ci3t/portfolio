"use client";
import { addProject, checkTechStackIcons } from "@/lib/action";
import { cn } from "@/lib/utils";
import { AlertCircle, Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import TagInput from "./Tags";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/textarea";

interface CloudinaryResourceInfo {
  public_id: string;
  secure_url: string;
}

export function AddProject() {
  const [resource, setResource] = useState<CloudinaryResourceInfo | undefined>(
    undefined
  );
  const [tags, setTags] = useState<string[]>([]);
  const [onSuccessMsg, setOnSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [missingIcons, setMissingIcons] = useState<string[]>([]);
  const [iconResources, setIconResources] = useState<CloudinaryResourceInfo[]>(
    []
  ); // for tech stack icons

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setOnSuccessMsg(null);
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
      setOnSuccessMsg(response);
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
    <div className="min-h-screen w-full  p-4 md:p-8 rounded-xl">
      <div className="max-w-3xl w-full mx-auto rounded-xl p-6 md:p-8 shadow-lg bg-purple-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-violet-400/70">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
          Add Project
        </h2>
        {onSuccessMsg && <p>{onSuccessMsg}</p>}
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Missing Icons Display */}
        {missingIcons.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="font-medium text-amber-800 dark:text-amber-400 mb-2">
              Missing icons:
            </p>
            <ul className="list-disc list-inside text-amber-700 dark:text-amber-300">
              {missingIcons.map((icon, idx) => (
                <li key={idx}>{icon}</li>
              ))}
            </ul>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label
              htmlFor="title"
              className="text-neutral-700 dark:text-neutral-200"
            >
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Project Title"
              type="text"
              className="bg-white  border-neutral-200 dark:border-neutral-700 focus:ring-violet-500 dark:focus:ring-violet-400"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label
              htmlFor="link"
              className="text-neutral-700 dark:text-neutral-200"
            >
              Live Website
            </Label>
            <Input
              name="link"
              id="link"
              placeholder="https://..."
              type="text"
              className="bg-white dark:bg-[#190E36] border-neutral-200 dark:border-neutral-700"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label
              htmlFor="img_url"
              className="text-neutral-700 dark:text-neutral-200"
            >
              Project Image
            </Label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-image"
              onSuccess={(result) => {
                setResource(result?.info as CloudinaryResourceInfo);
              }}
            >
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => {
                    setResource(undefined);
                    open();
                  }}
                  className="flex items-center justify-center w-full px-4 py-2 rounded-lg border border-violet-200 dark:border-violet-700 bg-white dark:bg-[#190E36] text-violet-700 dark:text-violet-200 hover:bg-violet-50 dark:hover:bg-violet-800 transition-colors"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Project Image
                </button>
              )}
            </CldUploadWidget>
            {resource?.secure_url && (
              <div className="mt-4 rounded-lg overflow-hidden border border-violet-200 dark:border-violet-600">
                <img
                  className="w-full h-48 object-cover"
                  src={resource.secure_url}
                  alt="Project preview"
                />
              </div>
            )}
          </LabelInputContainer>

          <LabelInputContainer>
            <Label
              htmlFor="icon"
              className="text-neutral-700 dark:text-neutral-200"
            >
              Tech Stack
            </Label>
            <TagInput
              tags={tags}
              setTags={setTags}
              // className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label
              htmlFor="des"
              className="text-neutral-700 dark:text-neutral-200"
            >
              Description
            </Label>
            <Textarea
              id="des"
              name="des"
              placeholder="Describe your project..."
              className="min-h-[120px] bg-white dark:bg-[#190E36] border-violet-400  dark:border-violet-600 "
            />
          </LabelInputContainer>

          <button
            type="submit"
            disabled={!resource}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
              "bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800",
              "text-white shadow-lg shadow-violet-500/25",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
            )}
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
}

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
  );
};
