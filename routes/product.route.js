const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middlewares/auth.middleware')
const Product = require('../models/product.model')

router.route('/')
    .get(async (req,res)=>{
        try{
            const products = await Product.find({})
            res.json({success:true,products})
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })


router.use('/addProduct',verifyToken)
router.route('/addProduct')
    .post(async (req,res)=>{
        const newProduct = req.body
        try{
            const addNewProduct = new Product(newProduct)
            const addedProduct = await addNewProduct.save()
            res.json({success:true,message:"Product successfully added", addedProduct})
        }catch(err){
            res.json({success:false,message:"Failed to add the product",error:err.message})
        }
    })

module.exports = router