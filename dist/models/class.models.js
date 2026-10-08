"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const classSchema = new mongoose_1.default.Schema({
    classname: {
        type: String,
        required: [true, "name is required"],
        unique: true,
    },
    section: {
        type: String,
        required: true,
    },
    room_no: {
        type: Number,
        required: [true, "Roll number is required"],
    },
    teacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "teacher",
        required: true,
    },
}, { timestamps: true });
const Class = mongoose_1.default.model("class", classSchema);
exports.default = Class;
