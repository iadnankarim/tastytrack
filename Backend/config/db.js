import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://adnankarim725_db_user:5hij1xqcY7ykaALD@cluster0.kfoyegf.mongodb.net/food-del")
    .then(()=>console.log('DB Connect'))
}