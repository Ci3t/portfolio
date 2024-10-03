"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { addTechStackIcon } from "@/lib/action"; // Import your server action
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { LabelInputContainer } from "./AddProject";
interface CloudinaryResourceInfo {
  public_id: string;
  secure_url: string;
}

export function AddIconForm() {
  const [resource, setResource] = useState<CloudinaryResourceInfo | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (resource) {
      formData.set("public_id", resource.public_id);
      formData.set("secure_url", resource.secure_url);
    }

    try {
      const response = await addTechStackIcon(formData); // Call server action
      console.log("Server response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>Add Tech Stack Icon</h2>

      <form onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="name"
            placeholder="Tech Stack Name (e.g., React)"
            required
          />
        </LabelInputContainer>

        <CldUploadWidget
          signatureEndpoint="/api/sign-image"
          onSuccess={(result) =>
            setResource(result.info as CloudinaryResourceInfo)
          }
        >
          {({ open }) => (
            <button type="button" onClick={() => open()}>
              Upload Icon Image
            </button>
          )}
        </CldUploadWidget>

        {/* Display uploaded image */}
        {resource && <img src={resource.secure_url} alt="Icon" width={100} />}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
