import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./Middlewares/errorHandler.middleware";

const app =express();
app.use(express.json());

app.get("/",(req:Request, res:Response,next:NextFunction)=>{
        res.status(200).json({
        message:"Server is running",
        data:null,
        success:true,
        status:"success",
        });
});





app.use(errorHandler);
export default app;