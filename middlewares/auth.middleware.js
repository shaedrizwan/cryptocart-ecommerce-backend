const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const checkLogin = async(req,res,next) =>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({success:false,message:"User not found"})
        }
        if(user){
            isValidPassword = await bcrypt.compare(password,user.password)
            if(isValidPassword){
                req.user = user
                return next()
             }
             else{
                 return res.status(401).json({success:false,message:"Authentication failed"})
             }
        }
    }
    catch(err){
        res.status(500).json({success:false,message:"Authentication error",error:err.message})
    }
}


const verifyToken = (req,res,next) =>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = decoded.userId
        return next()
    }catch{
        return res.status(401).json({success:false,message:"Unauthorized Access"})
    }
}

module.exports = {checkLogin,verifyToken}