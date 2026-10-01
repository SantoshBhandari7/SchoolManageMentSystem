"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const programSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
    },
}, { timestamps: true });
const Program = mongoose_1.default.model("program", programSchema);
exports.default = Program;
