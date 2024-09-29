import { Schema,model,models } from "mongoose";


const projectsSchema = new Schema({
    
        
        title: {
            type:String,
            required:true,
            trim:true
        },
        des: {
            type:String,
            required:true,
            trim:true
        },
        imgUrl: {
            type:String,
            required:true,
            trim:true
        },
        img: {
            type:String,
            required:true,
            trim:true
        },
        iconLists: {
            type:[String],

        },
        link: String,
      
},{timestamps:true}
)

export const Projects = models.Projects || model("Projects",projectsSchema)