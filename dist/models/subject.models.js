"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    subjectname: {
        type: String,
        required: [true, "Subject name is required"],
        unique: [true, "duplicate name"],
    },
    credithour: {
        type: Number,
        required: true,
    },
    teacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "teacher",
        required: true,
    },
    program: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "program",
    },
    class: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "class",
    },
}, { timestamps: true });
const Subject = mongoose_1.default.model("subject", subjectSchema);
exports.default = Subject;
