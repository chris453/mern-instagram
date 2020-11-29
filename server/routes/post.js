const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require('../middleware/requireLogin')

router.post('/createpost',requireLogin,(req,res)=>{
const { title,body} = req.body
if(!title || !body){
    return res.status(402).json({error:" please add all fields"})

}
res.send("ok")
console.log(req.User)

})
module.exports = router