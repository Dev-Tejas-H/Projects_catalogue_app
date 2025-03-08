import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    projectTitle:{
        type:String,
        required: true, 
    },
    members:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true
    },
    technology:{
        type:String,
        required: true
    },
    startDate:{
        type:String,
        required: true
    },
    endDate:{
        type:String,
        required: true
    },       
    description:{
        type:String,
        required: true
    },    
    status:{
        type:String,
        required: true
    },    
    },
    {timestamps : true}
);

export default mongoose.model("Projects", projectSchema)