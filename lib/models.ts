import { Schema, model, models } from "mongoose";

const projectsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    des: {
      type: String,
      required: true,
      trim: true,
    },

    img_url: {
      type: String,

      trim: true,
    },
    img_id: {
      type: String,

      trim: true,
    },
    link: String,
    iconLists: [{ type: Schema.Types.ObjectId, ref: "TechStack" }],
  },
  { timestamps: true }
);

const TechStackSchema = new Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
});

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    quote: { type: String, required: true },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const WorkExperienceSchema = new Schema(
  {
    title: { type: String, required: true, lowercase: true, trim: true },
    desc: { type: String, required: true, lowercase: true, trim: true },
    thumbnail: { type: String, required: true, lowercase: true, trim: true },
    className: { type: String, required: true, lowercase: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const WorkExperience =
  models?.WorkExperience || model("WorkExperience", WorkExperienceSchema);

export const Testimonial =
  models?.Testimonial || model("Testimonial", TestimonialSchema);

export const TechStack =
  models?.TechStack || model("TechStack", TechStackSchema);

export const Projects = models?.Projects || model("Projects", projectsSchema);
