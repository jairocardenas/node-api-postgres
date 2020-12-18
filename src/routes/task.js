import { Router } from 'express';
import { createTask, getTask, getOneTask, deleteTask, updateTask, getTaskByProject, getInnerTaskByProject } from '../controllers/task-controller';
const router = Router();

//api/tasks
router.post('/', createTask);
router.get('/', getTask);

//api/prjects/:ProjectId
// router.get('/:id', getOneTask);
router.get('/:id', getInnerTaskByProject);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);


//api/tasks/project/:projectid
router.get('/project/:projectid', getTaskByProject);
export default router;
