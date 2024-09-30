"use server"

import { connectToDb } from "./db";
import { Projects } from "./models";

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
        if(!id){
            throw new Error("No id found")
        }
         await Projects.findByIdAndDelete({id})
    } catch (error:any) {
        console.log(error);
        throw new Error ("Failed to Delete Proejct",error?.message)
        
    }

}
export const getProjects = async ()=>{

    connectToDb()

    try {
      
         const projects = await Projects.find()
         return projects
    } catch (error:any) {
        console.log(error);
        throw new Error ("Failed to fetch Proejcts",error?.message)
        
    }

}