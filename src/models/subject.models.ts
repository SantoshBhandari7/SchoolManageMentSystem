import mongoose from "mongoose";


const subjectSchema = new mongoose.Schema({
        subjectname:{
                type:String,
                required:[true,"Subject name is required"],
                unique:[true, "duplicate name"]
        },
        credithour:{
                type:Number,
                required:true,
        },
        teacher:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"teacher",
                required:true,
        },
        class:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"class",
                required:true,
        },


},{timestamps:true});

const Subject = mongoose.model("subject",subjectSchema);
export default Subject;