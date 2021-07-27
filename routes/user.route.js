const express = require('express')
const { checkLogin } = require('../middlewares/auth.middleware')
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.route('/signup')
    .post(async(req,res)=>{
        try{
            const user = req.body
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(user.password,salt)
            user.password = hashedPassword
            const newUser = new User(user)
            const addUser = await newUser.save()
            res.json({success:true,addUser})
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })

router.use(checkLogin)
router.route('/login')
    .post((req,res)=>{
        const user = req.user
        const token = jwt.sign({userId:user._id},process.env.TOKEN_SECRET,{expiresIn:'24h'})
        res.json({success:true,message:"Login successful",user:user.username,token})
    })

module.exports = router