import mongoose from "mongoose";
export const Person=mongoose.model("Person",{
    name:String,
    salary:Number,
    approved:Boolean
})