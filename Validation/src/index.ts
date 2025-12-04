// main entry point of our server


import express, {type Application} from 'express';
import userRoutes from './routes/userRoutes.js';   //pachi create garcham
const app: Application = express();

const PORT = 5000;
app.use(express.json());   //middleware: json body haru read garcha 

// app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoutes);   //route for users

//default routes
app.get('/', (req, res) => {
    res.send("Express + TypeScript + Prisma API is running!")
});

app.listen(PORT, ()=>{
    console.log(`Server started at: http://localhost:${PORT}`);
});