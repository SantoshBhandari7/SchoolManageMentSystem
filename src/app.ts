import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./Middlewares/errorHandler.middleware";
import AuthRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";
import teacherRoutes from "./routes/teacher.routes";
import subjectRoutes from "./routes/subject.routes";
import classRoutes from "./routes/class.routes";
import cookiesParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.utils";
import Env_Config from "./config/ENV_CONFIG";
import programRoutes from "./routes/program.routes";

const app = express();
const allowed_origins = Env_Config.allowed_origins.split(",") ?? [];

app.use(
  cors({
    origin: allowed_origins,
    credentials: true,
  }),
);

app.use(cookiesParser());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Server is running",
    data: null,
    success: true,
    status: "success",
  });
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/program", programRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/class", classRoutes);

app.use(errorHandler);
export default app;
