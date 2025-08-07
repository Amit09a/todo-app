const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


// generate jwt token
const generateToken = (id) => jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'}) 

// new register and if already exists

exports.register = async(req,res)=>{
    const {name,email,password} = req.body;

    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({msg: 'user already exists' });

        const user = await User.create({name,email,password});
        const token = generateToken(user.id);
        res.json({token});
    } catch(err){
        res.status(500).json({msg:'server error',error: err.message});
    }
};

// user login

exports.login = async (req,res) => {
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({msg:'Invalid credentials '});

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({msg:'Invalid credentials'});

        const token = generateToken(user.id);
        res.json({token});
    } catch (err){
        res.status(500).json({msg:'Server error',error:err.message});
    }
};