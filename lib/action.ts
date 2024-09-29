"use server"

import { connectToDb } from "./db";
import { Projects } from "./models";

export const addProject = async(formdata:FormData)=>{
    connectToDb()

    const {title,des,imgUrl,icon,img} = Object.fromEntries(formdata)

    console.log(img);
    console.log(imgUrl);
    
    if (typeof icon === "string") {
        const iconArray = icon.split(",").map((item) => item.trim());
        console.log("iconArray", iconArray);
      } else {
        console.error("Expected a string but got a file or invalid type for icon.");
      }    
    const newProject = new Projects({
        title,des,img,icon
    })
    console.log(formdata);

    // await newProject.save()
    // console.log("New Project has been added");
    
    
}