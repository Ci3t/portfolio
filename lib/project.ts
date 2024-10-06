export interface TechStack {
    _id: string;
    name: string;
    secure_url: string;
  }
  
  export interface Project {
    _id: string;
    title: string;
    des: string;
    img_url: string;
    link: string;
    img_id?: string;
    iconLists: TechStack[];
    createdAt?: Date;
    updatedAt?: Date;
  }