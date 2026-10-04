"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = require("./Middlewares/errorHandler.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const teacher_routes_1 = __importDefault(require("./routes/teacher.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const class_routes_1 = __importDefault(require("./routes/class.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const program_routes_1 = __importDefault(require("./routes/program.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const app = (0, express_1.default)();
const allowed_origins = process.env.ORIGINS?.split(",") ?? [];
app.use((0, cors_1.default)({
    origin: allowed_origins,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Server is running",
        data: null,
        success: true,
        status: "success",
    });
});
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/students", student_routes_1.default);
app.use("/api/v1/teachers", teacher_routes_1.default);
app.use("/api/v1/programs", program_routes_1.default);
app.use("/api/v1/subjects", subject_routes_1.default);
app.use("/api/v1/classes", class_routes_1.default);
app.use("/api/v1/contacts", contact_routes_1.default);
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
