"use server"


import { revalidatePath } from "next/cache";
import { connectToDb } from "./db";
import { Projects } from "./models";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addProject = async(formdata:FormData)=>{
    connectToDb()

    const {title,des,imgUrl,icon,img_id,img_url} = Object.fromEntries(formdata)

    if (typeof icon === "string") {
        const iconArray = icon.split(",").map((item) => item.trim());
        console.log("iconArray", iconArray);
      } else {
        console.error("Expected a string but got a file or invalid type for icon.");
      }    

      if(!(title || des )){
        throw new Error("Missing Fields")
        
      }
      if(!(img_url || imgUrl )){
        throw new Error("One Image at least required")
        
      }
    const newProject = new Projects({
        title,des,img_id,img_url,icon,imgUrl
    })
    console.log(formdata);

    await newProject.save()
    console.log("New Project has been added");
    return "New Project has been added"
    
    
}

export const deleteProject = async (id:string)=>{

    connectToDb()

    try {
        if (!id) {
            throw new Error("No id found");
          }
      
          const project = await Projects.findById(id);
          if (!project) {
            throw new Error("Project not found");
          }
          const img_id = project.img_id;
          console.log('img_id:', img_id);
          // Assuming the Cloudinary img_id is stored in the project document
          
          if (img_id) {
            await cloudinary.uploader.destroy(img_id);
            console.log(`Deleted image with img_id ${img_id}`);
          }
          await Projects.findByIdAndDelete(id);
          console.log(`Deleted project with id ${id}`);
          revalidatePath("/admin/projects")
    } catch (error:any) {
        console.log(error);
        throw new Error("Failed to delete project");
        
    }

}
export const getProjects = async ()=>{

    connectToDb()

    try {
      
         const projects = await Projects.find()
         return projects
    } catch (error:any) {
        console.log(error);
        throw new Error ("Failed to fetch Projects")
        
    }

}