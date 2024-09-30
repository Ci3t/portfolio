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
    
    
}