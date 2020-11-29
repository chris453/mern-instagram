const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get("/protected",requireLogin,(req,res)=>{
    res.send("hello user")
})
router.get("/" ,(req,res)=> {
res.send("hello")

})
router.post("/signup",(req, res)=>{
const { name,email,password} = req.body
if(!name || !email || !password){
    res.status(422).json({error:"please fill all fields"})

}
User.findOne({email:email})
.then((savedUser)=>{
if(savedUser){
    return res.status(422).json({error: "User already exist in database"})
}
bcrypt.hash(password, 12)
.then (hashedpassword=>{

    const user = new User({name,email,password:hashedpassword})
user.save()
.then(user=>{
    res.json({message:"user has been saved succesfully"})
})
.catch(err=>{
    console.log(err)
})
})



})
.catch(err=>{
    console.log(err)
})
res.json({message:"successful"})
 })

 router.post("/signin", (req,res)=>{
const {email,password} = req.body
if(!email || !password){
    return res.status(422).json({error: "Please add email or password"})
}
User.findOne({email})
.then(savedUser=>{
    if(!savedUser){
        return res.status(422).json({error: "invalid email or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
        if(doMatch){
const token = jwt.sign({_id:savedUser._id}, JWT_SECRET) 
  res.json({token})
        }
        else{
            return res.status(422).json({error: "invalid email or password"})

        }
    })
    .catch(err=>{console.log(err)
    })
})


 })
 module.exports = router