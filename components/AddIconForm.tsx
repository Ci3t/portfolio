"use client";

import { addTechStackIcon } from "@/lib/action";
import { Upload } from "lucide-react"; // Import the upload icon
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { LabelInputContainer } from "./AddProject";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";

interface CloudinaryResourceInfo {
  public_id: string;
  secure_url: string;
}

export function AddIconForm() {
  const [resource, setResource] = useState<CloudinaryResourceInfo | undefined>(
    undefined
  );
  const [onSuccess, setOnSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (resource) {
      formData.set("public_id", resource.public_id);
      formData.set("secure_url", resource.secure_url);
    }

    try {
      const response = await addTechStackIcon(formData);
      console.log("Server response:", response);
      setOnSuccess(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-[20rem] w-full max-w-2xl  p-6   rounded-lg  shadow-lg bg-purple-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-violet-400/70">
      <h2 className="text-2xl font-bold mb-6  dark:text-white text-center ">
        Add Icon Name
      </h2>
      {onSuccess && <p>{onSuccess}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <LabelInputContainer>
          <Label htmlFor="title" className="block text-sm font-medium  ">
            Title
          </Label>
          <Input
            type="text"
            name="name"
            placeholder="Icon Name (e.g., React)"
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-[#190E36] border-violet-500 dark:border-violet-500 focus:ring-violet-500 dark:focus:ring-violet-400"
          />
        </LabelInputContainer>

        <div className="mt-4">
          <CldUploadWidget
            signatureEndpoint="/api/sign-image"
            onSuccess={(result) =>
              setResource(result.info as CloudinaryResourceInfo)
            }
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full flex items-center justify-center px-4 py-2 border border-violet-300 dark:border-violet-600 rounded-md shadow-sm text-sm font-medium text-violet-700 dark:text-violet-200 bg-white dark:bg-[#190E36] hover:bg-violet-50 dark:hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Icon Image
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* Display uploaded image */}
        {resource && (
          <div className="mt-4 flex justify-center">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <img
                src={resource.secure_url}
                alt="Icon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
