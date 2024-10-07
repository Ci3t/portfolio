"use server";
import { connectToDb } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { Testimonial } from "./models";
export const addTestimonials = async (formData: FormData) => {
  try {
    console.log("Starting addTestimonials...");
    console.log("Connecting to DB...");
    await connectToDb();
    console.log("Connected to DB successfully");

    const { title, name, quote } = Object.fromEntries(formData) as {
      title: string;
      quote: string;
      name: string;
    };

    console.log("Received data:", { title, name, quote });

    // Input validation
    if (!title || !quote || !name) {
      throw new Error("Missing required fields");
    }

    console.log("Creating new testimonial...");
    const newTestimonial = new Testimonial({
      title,
      name,
      quote,
    });

    console.log("Saving testimonial...");
    await newTestimonial.save();
    console.log("Testimonial saved successfully");

    revalidatePath("/admin/addtestimonials");
    return "New testimonial has been added";
  } catch (error) {
    console.error("Detailed error in addTestimonials:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to add testimonial"
    );
  }
};

export const updateTestimonial = async (id: string, formData: FormData) => {
  try {
    await connectToDb();

    const { title, name, quote } = Object.fromEntries(formData) as {
      title: string;
      quote: string;
      name: string;
    };

    if (!title || !quote || !name) {
      throw new Error("Missing required fields");
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        title,
        name,
        quote,
      },
      { new: true }
    );

    if (!updatedTestimonial) {
      throw new Error("Testimonial not found");
    }

    revalidatePath("/admin/testimonials");
    return "Testimonial has been updated";
  } catch (error) {
    console.error("Error in updateTestimonial:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update testimonial"
    );
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    await connectToDb();

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      throw new Error("Testimonial not found");
    }

    revalidatePath("/admin/testimonials");
    return "Testimonial has been deleted";
  } catch (error) {
    console.error("Error in deleteTestimonial:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete testimonial"
    );
  }
};

export const getTestimonials = async () => {
  try {
    await connectToDb();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return testimonials;
  } catch (error) {
    console.error("Error in getTestimonials:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch testimonials"
    );
  }
};
