import express, {Application} from 'express';
import userRoutes from './routes/userRoutes.js';

const app: Application = express();

const port = process.env.PORT || 4000;
app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})