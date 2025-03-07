const express = require('express');
const router = express.Router();
const userModel = require('../schemas/users.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'crimepatrol'
router.post('/signup',async(req,res)=>{
    const {name, email,password} = req.body; 
    console.log(email, password, name);
    let user =await userModel.findOne({ email: email });
    if(user){
        return res.status(400).json({success:false,message:"Email already exists"})
    }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    console.log(hashPassword)
    user = await userModel.create({
        name:name,
        email:email,
        password:hashPassword
    })
    const token = jwt.sign({id:user._id}, JWT_SECRET);
    res.status(200).json({success:true,message:"Account has been created successfully",token:token})
  } catch (error) {
    res.status(500).json({success:false,message:"Error creating user"})
  }
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    let user = await userModel.findOne({email: email})
    console.log(user)
    if(!user){
        return res.status(400).json({success:false,message:"Invalid email or password"})
    }
    try {
        const data = await bcrypt.compare(password, user.password)
        console.log(data)
        if(!data){
            return res.status(400).json({success:false,message:"Invalid email or password"})
        }
        const token = jwt.sign({id:user._id}, JWT_SECRET);
        console.log(token)
        res.status(200).json({success:true,message:"User logged in successfully",token:token})

    } catch (error) {
        res.status(500).json({success:false,message:"Error logging in user"})
    }
});

module.exports = router;