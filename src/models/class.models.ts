import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    }
  },
  { timestamps: true },
);

const Class = mongoose.model("class", classSchema);
export default Class;
