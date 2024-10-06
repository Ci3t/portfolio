"use server";

import { revalidatePath } from "next/cache";
import cloudinary from "./cloudinary";
import { connectToDb } from "./db";
import { Projects, TechStack } from "./models";

export const addProject = async (formData: FormData) => {
  await connectToDb();

  const { title, des, icon, img_id, img_url, iconResources, link } =
    Object.fromEntries(formData) as {
      title: string;
      des: string;
      icon: string;
      img_id: string;
      img_url: string;
      link: string;
      iconResources: string;
    };

  // Normalize the icon array: trim whitespace and convert to lowercase
  const iconArray = icon
    ? icon
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean) // Remove empty strings
    : [];

  if (iconArray.length === 0) {
    throw new Error("No icons provided for the project");
  }
  const iconResourcesArray = JSON.parse(iconResources); // Parse icon resources

  // Input validation
  if (!title || !des) {
    throw new Error("Missing required fields: title or description");
  }
  if (!img_url) {
    throw new Error("One image is required");
  }

  // Missing icon tracking
  const missingIcons: string[] = [];

  // Cloudinary check for tech stack icons
  const techIcons = await Promise.all(
    iconArray.map(async (tag: string, index: number) => {
      const existingIcon = await TechStack.findOne({ name: tag });
      if (existingIcon) {
        return existingIcon._id; // Return existing icon ID
      } else {
        const iconResource = iconResourcesArray[index]; // Access corresponding resource
        if (!iconResource?.secure_url) {
          missingIcons.push(tag); // Add missing tag to the list
          return null;
        }

        const res = await cloudinary.uploader.upload(iconResource.secure_url, {
          public_id: tag + Math.floor(Math.random() * 10000), // Use the tag as public_id
        });

        // Create a new entry for the uploaded icon in the TechStack collection
        const newIcon = new TechStack({
          name: tag.toLowerCase(),
          public_id: res.public_id,
          secure_url: res.secure_url,
        });

        await newIcon.save();
        return newIcon._id; // Return the new icon's ID
      }
    })
  );

  // Check if there are any missing icons and throw an error
  if (missingIcons.length > 0) {
    throw new Error(`Missing icons for: ${missingIcons.join(", ")}`);
  }

  // Create a new project with associated tech icons
  const newProject = new Projects({
    title,
    des,
    img_id,
    img_url,
    link,
    iconLists: techIcons.filter(Boolean), // Save the array of tech icon IDs here
  });

  await newProject.save(); // Save the project to the database
  revalidatePath("/admin/projects");
  console.log("New Project has been added");
  return "New Project has been added";
};

export const deleteProject = async (id: string) => {
  await connectToDb();

  try {
    if (!id) {
      throw new Error("No id found");
    }

    const project = await Projects.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    const img_id = project.img_id;
    console.log("img_id:", img_id);
    // Assuming the Cloudinary img_id is stored in the project document

    if (img_id) {
      await cloudinary.uploader.destroy(img_id);
      console.log(`Deleted image with img_id ${img_id}`);
    }
    await Projects.findByIdAndDelete(id);
    console.log(`Deleted project with id ${id}`);
    revalidatePath("/admin/projects");
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to delete project");
  }
};

export const getTechOptions = async () => {
  await connectToDb();
  try {
    const techOptions = await TechStack.find({}).select("name secure_url _id");
    return JSON.parse(JSON.stringify(techOptions));
  } catch (error) {
    console.error("Error fetching tech options:", error);
    throw new Error("Failed to fetch tech options");
  }
};
export const updateProject = async (id: string, updatedData: any) => {
  await connectToDb();

  try {
    if (!id) {
      throw new Error("No id provided");
    }

    const project = await Projects.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    const { iconLists, ...otherData } = updatedData;

    // Update basic fields
    Object.assign(project, otherData);

    // Handle tech stack updates if provided
    if (iconLists && Array.isArray(iconLists)) {
      // Check if all tech stack icons exist
      const { missingIcons } = await checkTechStackIcons(iconLists);

      if (missingIcons.length > 0) {
        throw new Error(`Unknown technology tags: ${missingIcons.join(", ")}`);
      }

      // Find all matching tech stack documents
      const techStacks = await TechStack.find({
        name: { $in: iconLists.map((name) => name.toLowerCase().trim()) },
      });

      // Update the iconLists with the found document IDs
      project.iconLists = techStacks.map((tech) => tech._id);
    }

    // Save the updated project
    const updatedProject = await project.save();

    // Populate the iconLists before returning
    const populatedProject = await updatedProject.populate("iconLists");

    revalidatePath("/admin/projects");
    return JSON.parse(JSON.stringify(populatedProject));
  } catch (error: any) {
    const errorMessage = error.message || "Failed to update the project";
    console.error("Error updating project:", errorMessage);
    throw new Error(errorMessage);
  }
};
export const getProjects = async () => {
  await connectToDb();

  try {
    const projects = await Projects.find()
      .populate({
        path: "iconLists",
        model: "TechStack",
        select: "name secure_url -_id", // Exclude _id if you don't need it
      })
      .lean() // Convert to plain JavaScript objects
      .exec(); // Make sure to execute the query

    return JSON.parse(JSON.stringify(projects)); // Serialize for Next.js
    revalidatePath("/admin/projects");
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch Projects");
  }
};

export const addTechStackIcon = async (formData: FormData): Promise<string> => {
  await connectToDb();

  const { name, public_id, secure_url } = Object.fromEntries(formData) as {
    name: string;
    public_id: string;
    secure_url: string;
  };
  const normalizedName = name.trim().toLowerCase();
  const existingIcon = await TechStack.findOne({ name });
  if (existingIcon) {
    throw new Error(`Icon for ${normalizedName} already exists.`);
  }

  const newIcon = new TechStack({
    name: normalizedName,
    public_id,
    secure_url,
  });

  await newIcon.save();
  return "Tech Stack Icon added successfully";
};

export const checkTechStackIcons = async (
  iconArray: string[]
): Promise<{ missingIcons: string[] }> => {
  await connectToDb();

  const missingIcons: string[] = [];

  // Check each icon if it exists in the database
  for (const icon of iconArray) {
    const normalizedIcon = icon.trim().toLowerCase();
    const existingIcon = await TechStack.findOne({ name: normalizedIcon });
    if (!existingIcon) {
      missingIcons.push(normalizedIcon);
    }
  }

  return { missingIcons };
};
