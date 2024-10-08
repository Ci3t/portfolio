"use server";
import { connectToDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { WorkExperience } from "./models";

// Add new work experience
export const addWorkExperience = async (formData: FormData) => {
  try {
    await connectToDb();

    const { title, className, thumbnail, desc } = Object.fromEntries(
      formData
    ) as {
      title: string;
      className: string;
      thumbnail: string;
      desc: string;
    };

    // Input validation
    if (!title || !className || !desc || !thumbnail) {
      throw new Error("Missing required fields");
    }

    const newWorkExperience = new WorkExperience({
      title,
      className,
      thumbnail,
      desc,
    });

    await newWorkExperience.save();

    revalidatePath("/admin/addworkexperience");
    return "New Work Experience has been added";
  } catch (error) {
    console.error("Detailed error in addWorkExperience:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to add Work Experience"
    );
  }
};

// Update existing work experience
export const updateWorkExperience = async (id: string, formData: FormData) => {
  try {
    await connectToDb();

    const { title, className, thumbnail, desc } = Object.fromEntries(
      formData
    ) as {
      title: string;
      className: string;
      thumbnail: string;
      desc: string;
    };

    if (!title || !className || !desc || !thumbnail) {
      throw new Error("Missing required fields");
    }

    const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(
      id,
      {
        title,
        className,
        thumbnail,
        desc,
      },
      { new: true }
    );

    if (!updatedWorkExperience) {
      throw new Error("Work Experience not found");
    }

    revalidatePath("/admin/workexperience");
    return "Work Experience has been updated";
  } catch (error) {
    console.error("Error in updateWorkExperience:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to update Work Experience"
    );
  }
};

// Delete work experience
export const deleteWorkExperience = async (id: string) => {
  try {
    await connectToDb();

    const deletedWorkExperience = await WorkExperience.findByIdAndDelete(id);

    if (!deletedWorkExperience) {
      throw new Error("Work Experience not found");
    }

    revalidatePath("/admin/workexperience");
    return "Work Experience has been deleted";
  } catch (error) {
    console.error("Error in deleteWorkExperience:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to delete Work Experience"
    );
  }
};

// Get all work experiences
export const getWorkExperience = async () => {
  try {
    await connectToDb();
    const allWorkExperience = await WorkExperience.find({}).sort({
      createdAt: -1,
    });
    return allWorkExperience;
  } catch (error) {
    console.error("Error in getWorkExperience:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch Work Experience"
    );
  }
};
