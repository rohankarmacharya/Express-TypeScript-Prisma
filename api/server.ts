// import express, { Request, Response } from 'express';
// const app = express();

// app.use(express.json());   //global middleware

// //local middleware
// //filters, file upload, csv export, ORM, postgresql, database connect, swagger, pagination
// const reqLogger = (req, res, next) => {
//     console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
//     next(); 
// };

// app.use(reqLogger);

// app.get('/health', (req: Request, res: Response) => {
//     // console.log(req.query);  //query params     //body get ma hudaina post ma huncha
//     // res.status(400).json({message: "All good!"});
//     res.send("Hi! I'm healthy!");
// });

// app.post('/api/users', (req, res) => {
//     console.log('body', req.body.name);
//     res.json({});

// })

// // app.get('/hello', (req: Request, res: Response)=>{
// //     res.send("Hello world!");
// // });

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });