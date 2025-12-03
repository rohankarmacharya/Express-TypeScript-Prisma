import express, {Application} from "express";
import uploadRoutes from "./routes/uploadRoutes.js";

const app: Application= express();

const port = process.env.PORT || 4000;
app.use(express.json());

app.use('/uploads', express.static("uploads"));
app.use('/upload', uploadRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})