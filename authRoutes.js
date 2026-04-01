
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req,res)=>{
  const user = await User.create(req.body);
  res.json(user);
});

router.post('/login', async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user || !(await user.matchPassword(req.body.password))){
    return res.status(400).json({msg:"Invalid credentials"});
  }
  const token = jwt.sign({id:user._id, role:user.role}, "secret123");
  res.json({token});
});

module.exports = router;
