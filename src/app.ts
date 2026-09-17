import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./Middlewares/errorHandler.middleware";
import AuthRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";
import teacherRoutes from "./routes/teacher.routes";
import subjectRoutes from "./routes/subject.routes";
import classRoutes from "./routes/class.routes";
import { ApiError } from "./utils/ApiError.utils";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Server is running",
    data: null,
    success: true,
    status: "success",
  });
});

app.use("/api/v1/auth", AuthRoutes);
// app.use("/api/v1/student", AdminRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/class", classRoutes);

app.use(errorHandler);
export default app;
