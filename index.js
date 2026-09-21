import express from 'express';
import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);

 

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
});
