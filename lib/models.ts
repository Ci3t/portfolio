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
       
        img_url: {
            type:String,
            
            trim:true
        },
        img_id: {
            type:String,
           
            trim:true
        },
        link: String,
        iconLists: 
            [{ type: Schema.Types.ObjectId, ref: 'TechStack' }],

        
       
      
},{timestamps:true}
)


const TechStackSchema = new Schema({
    name: { type: String, required: true },
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  });
  
  export const TechStack = models?.TechStack || model('TechStack', TechStackSchema);
export const Projects = models?.Projects || model("Projects",projectsSchema)