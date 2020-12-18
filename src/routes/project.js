import { Router } from 'express';
import { createProject, getProject, getOneProject, deleteProject, updateProject } from '../controllers/project-controller';
const router = Router();
// import { jsonwebtoken } from 'jsonwebtoken';



// const jwt = jsonwebtoken();
const express = require("express");
// const { check, validationResult } = require("express-validator");

//api/projects
router.post('/', createProject);
router.get('/', getProject);

//api/prjects/:ProjectId
router.get('/:id', getOneProject);
router.delete('/:id', deleteProject);
router.put('/:id', updateProject);


// function ensureToken(req, res, next) {
//     const bearerHeader = req.header['autorization'];
//     console.log(bearerHeader);
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.status(403);

//     }

// }

export default router;
