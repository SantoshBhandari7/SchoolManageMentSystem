"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../@types/enum.types");
const image_model_1 = require("./image.model");
const teacherSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
    },
    profile_image: {
        type: image_model_1.imageSchema,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
        enum: enum_types_1.Gender,
    },
    experience: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
    },
    salary: {
        type: Number,
    },
    address: {
        type: String,
    },
}, { timestamps: true });
const Teacher = mongoose_1.default.model("teacher", teacherSchema);
exports.default = Teacher;
