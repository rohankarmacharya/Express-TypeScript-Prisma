import express, {Request, Response} from 'express';
import { User } from '../types/user.js';

let users : User[] =[
    {id: 1, name: 'rohan', age: 23},
];

export const getUsers = (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "All data fetched",
        data : users,
    }); 
};

export const createUser= (req: Request, res: Response) => {
    const {name, age} = req.body;  //body ma huncha client le pathako data
    
    //validation
    if(!name || !age){
            return res.status(400).json({
                success: false,
                message: "Name and age are required",
            })
    }

    const newUser: User = {
        id: users.length+1,
        name,
        age,
    };

    users.push(newUser);

    res.status(200).json({
        success: true,
        message: "a new user added",
        data: newUser,
    })
      
    }
