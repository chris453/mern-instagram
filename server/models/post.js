const mongoose = require("mongoose")
const {Objectid} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
title:{ type:String, required: true},
body:{type: String, required: true},
photo:{type: String, default:"no photo"},
postedBy: {Objectid, ref: "User"},


}) 
mongoose.model ("Post",postSchema)
