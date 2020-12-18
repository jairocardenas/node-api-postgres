import { json } from "express";
import Task from '../models/Task';

import Project from "../models/Project";


export async function getTask(req, res) {

    try {
        let tasks = await Task.findAll({

            attributes: ['projectid', 'name', 'done', 'id'],
            orderBy: ['id', 'DESC']
        });
        // console.log(tasks);
        res.json({
            data: tasks
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

}

export async function createTask(req, res) {
    try {
        const { name, priority, done, projectid } = req.body;

        let newTask = await Task.create({

            name,
            priority,
            done,
            projectid
        }, {
            feilds: ['name', 'priority', 'done', 'projectid']
        });

        if (newTask) {
            res.status(200).json({
                message: "New Task created",
                data: newTask
            });
        }

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}


export async function getOneTask(req, res) {
    try {
        const { id } = req.params;
        const tasks = await Task.findOne({
            where: {
                id
            },
            attributes: ['id', 'name', 'priority', 'done', 'projectid'],
            orderBy: ['id', 'DESC']
        });
        res.status(200).json({
            tasks
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }


}

export async function deleteTask(req, res) {

    await Task.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (deleteTask) {
            if (deleteTask === 1) {
                res.status(200).json({ message: "Deleted successfully" });
            }
            else {
                res.status(404).json({ message: "record not found" });
            }
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
}

export async function getTaskByProject(req, res) {

    try {
        const { projectid } = req.params;
        const tasks = await Task.findAll({
            where: {
                projectid
            },
            attributes: ['id', 'name', 'priority', 'done', 'projectid'],
            orderBy: ['id', 'DESC']
        });
        if (tasks.length > 0) {
            res.status(200).json({ message: "Data found", data: tasks });
        } else {
            res.status(404).json({ message: "record not found" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

export async function updateTask(req, res) {

    try {
        const { id } = req.params;
        const { name, priority, done, projectid } = req.body;

        const tasks = await Task.findOne({
            where: {
                id
            }
        });

        const updTask = await Task.update({
            name,
            priority,
            done,
            projectid
        }, {
            where: { id }
        });
        if (updTask > 0) {
            res.status(200).json({ message: "update successfully" });
        } else {
            res.status(404).json({ message: "record not found" });
        }

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }


}


export async function getInnerTaskByProject(req, res) {
    const { id } = req.params;

    const tasks = await Task.findOne({
        include: [{
            model: Project,
            where: {
                id
            },
             attributes: [ 'name'],
        }]
    });
    
    if (Object.values(tasks).length > 0) {
        res.status(200).json({ message: "Data found", data: tasks });
    } else {
        res.status(404).json({ message: "record not found" });
    }
}