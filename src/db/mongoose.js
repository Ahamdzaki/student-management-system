import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/Computer-Api').then(()=>{
    console.log("You are connected to mongodb");
}).catch((e)=>{
    console.log("Failed to connect to MongoDB", e);
})
