"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../@types/enum.types");
const studentSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        requires: true,
    },
    gender: {
        type: String,
        enum: enum_types_1.Gender,
    },
    address: {
        type: String,
    },
    roll_no: {
        type: Number,
    },
    class: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "class",
    },
    parentName: {
        type: String,
        required: true,
    },
    parentPhone: {
        type: Number,
    },
}, { timestamps: true });
const Student = mongoose_1.default.model("student", studentSchema);
exports.default = Student;
