import express from "express"
import { create, deleteProject, getAllProjects, getProjectById, updateProject } from "../controller/projectController.js";

const route = express.Router();

route.post("/project",create);
route.get("/projects", getAllProjects);
route.get("/project/:id",getProjectById);
route.put("/update/project/:id", updateProject);
route.delete("/project/delete/:id", deleteProject);

export default route;