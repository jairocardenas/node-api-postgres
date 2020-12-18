import express , {json} from 'express';
import morgan from 'morgan';

//import routes 
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';


//initializacion 
const app = express();



//middlewars
app.use(morgan('dev')); //tomar archivos json
app.use(json()); //entederlos

//routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

export default app;




