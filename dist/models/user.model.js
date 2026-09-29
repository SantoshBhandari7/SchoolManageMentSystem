"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enum_types_1 = require("../@types/enum.types");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "duplicate email"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    profile_image: {
        type: {
            path: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
        }
    },
    role: {
        type: String,
        enum: enum_types_1.Role,
        required: true,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
