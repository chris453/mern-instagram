const express = require("express")
const PORT = 5000
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require("./keys")


/*
const customMiddleWare = (req,res,next ) =>{
console.log("middle ware activated") 
next() // this is used to advance past the middle ware stage to get into the app stage
}
app.use(customMiddleWare) // is a global middleware which will run for all instances of app.get
// if you want individual instance put middleware const function into the app.get parameters you wish to run middle ware
*/
// used to connect to mongo database using key to gain access 
mongoose.connect(MONGOURI,
    { useNewUrlParser: true,
        useUnifiedTopology: true 
    })
mongoose.connection.on("connected",()=> {
console.log("connected to mongo")

})

mongoose.connect(MONGOURI)
mongoose.connection.on("error",(err)=> {
console.log("connected to mongo failed",err)

})

require ('./models/user')
//mongoose.model("User")
app.use(express.json())

app.use(require("./routes/auth"))
app.use(require("./routes/post"))



app.get("/",(req,res)=>{
    res.send("hello world")
})
app.listen(PORT, ()=>{
    console.log("server is running on " + PORT)
})