import ProjectModel from "../model/projectModel.js"
// import express from "express"
// import mongoose from "mongoose"
// import bodyParser from "body-parser"
// import dotenv from "dotenv"
// import cors from 'cors'
// import colors from 'colors'
// import morgan from "morgan"
// code to create a new project details

// export const create = async(req, res) => {

//     try {
//         const newProject = new ProjectModel(req.body);
//         const { projectName } = newProject;

//         const projectExist = await ProjectModel.findOne({ projectName });
//         if(projectExist) {
//             return res.status(400).json({message: "project already exists.."});
//         }
//         const savedData = await newProject.save();
//         res.status(200).json(savedData);

//     } catch (error) {
//         res.status(500).json({errorMessage:error.message})
//     }
// }
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

export const create = async(req, res) => {
    try {
        const { projectTitle, members, category, technology, startDate, endDate, description , status } = req.body;

        if (!projectTitle || !members || !category || !technology || !startDate || !endDate || !description || !status) {
            return res.status(400).json({ message: "All fields are required.."});
        }
        const newProject = new ProjectModel({projectTitle, members, category, technology, startDate, endDate, description, status});
        await newProject.save();

        res.json({ message: "project saved successfully!..", user: newProject});
    } catch(error) {
        res.status(500).json({ message: "server error", error});
    }
};



// code to retrieve all project details from the database using get method


export const getAllProjects = async(req, res) => {
    try {
        const projectData = await ProjectModel.find();
        if(!projectData || projectData.length === 0) {
            return res.status(404).json({message: "user data not found"});
        }
        res.status(200).json(projectData);
    } catch (error) {
        res.status(500).json({ errormessage: error.message});
    }
};

// get project by id

export const getProjectById = async(req, res) => {
    try {
        const id = req.params.id;
        const projectExist = await ProjectModel.findById(id);
        if(!projectExist) {
            return res.status(404).json({message: "project not found.."});
        }
        res.status(200).json(projectExist);
    } catch(error) {
        res.status(500).json({ errorMessage: error.message});
    }
};

// update project by id

export const updateProject = async(req, res) => {
    try {
        const id = req.params.id;
        const projectExist = await ProjectModel.findById(id);
        if(!projectExist) {
            return res.status(404).json({ message: "user not found.."});
        }
        const updatedData = await ProjectModel.findByIdAndUpdate(id, req.body, {
            new:true,
        })
        res.status(200).json(updatedData);
    } catch(error) {
        res.status(500).json({ errorMessage: error.message});
    }
};

// deteting project by id'

export const deleteProject = async(req, res) => {
    try {
        const id = req.params.id;
        const projectExist = await ProjectModel.findById(id);
        if(!projectExist) {
            return res.status(404).json({message: "project not found"});
        }
        await ProjectModel.findByIdAndDelete(id);
        res.status(200).json({message: "Project deleted successfully.."});
    } catch(error) {
        res.status(500).json({ errorMessage: error.message});
    }
};



