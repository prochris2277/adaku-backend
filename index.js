import express from 'express';
import taskRouter from './routes/taskRoutes.js';
import userRouter from './routes/userRoutes.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);

 

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})
