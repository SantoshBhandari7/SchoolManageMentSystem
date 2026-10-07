"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../@types/enum.types");
const image_model_1 = require("./image.model");
const studentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    profile_image: {
        type: image_model_1.imageSchema,
        required: [true, "profile_image is required"],
    },
    gender: {
        type: String,
        enum: enum_types_1.Gender,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    roll_no: {
        type: Number,
        required: true,
    },
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "class",
        required: true,
    },
    parentName: {
        type: String,
        required: true,
    },
    parentPhone: {
        type: String,
    },
}, { timestamps: true });
const Student = mongoose_1.default.model("student", studentSchema);
exports.default = Student;
