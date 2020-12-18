import { json } from "express";
import Project from '../models/Project';



export async function getProject(req, res) {
    try {
        let projects = await Project.findAll();
        console.log(projects);
        res.json({
            data: projects
        });
    } catch (error) {
        console.log(error);
    }
}

export async function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;

    try {
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        }, {
            feilds: ['name', 'priority', 'description', 'deliverydate']
        });
        if (newProject) {
            return res.json({
                message: 'Project creado',
                data: newProject
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Upss, hay un error',
            data: newProject
        });
    }
}

export async function getOneProject(req, res) {
    try {
        const { id } = req.params;
        const project = await Project.findOne({
            where: {
                id
            }
        });
        res.json(project);
    } catch (error) {
        console.log(error);
    }

}

// export async function deleteProject(req, res) {
//     console.log('estpoy entrando: ');

//     const { id } = req.params;
//     console.log('==> id: ', id);
//     const project = await Project.destroy({
//         where: {
//             id
//         }
//     });
//     res.json({
//         message: "ya se elimino",
//         data: project
//     });

// }

export async function deleteProject(req, res) {

    await Project.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function (deleteProject) {
            if (deleteProject === 1) {
                res.status(200).json({ message: "Deleted successfully" });
            }
            else {
                res.status(404).json({ message: "record not found" });
            }
        })
        .catch(function (error) {
            res.status(500).json(error);
        })

}


export async function updateProject(req, res) {

    try {
        const { id } = req.params;
        const { name, priority, description, deliverydate } = req.body;
        const projects = await Project.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
            where: {
                id
            }
        });

        if (projects.length > 0) {
            projects.forEach(async project => {
                await project.update({
                    name,
                    priority,
                    description,
                    deliverydate
                });
            });
            res.status(200).json({ message: "update successfully" });
        } else {
            res.status(404).json({ message: "record not found" });
        }

    } catch (error) {
        res.status(500).json(error);
    }
}
