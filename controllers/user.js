const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register =async (req,res) => {
    const {name,ucity,uflanguage,uslanguage,email,password} = req.body;
    if(!name||!ucity||!uflanguage||!uslanguage||!email||!password){
        res.status(400).json({msg:'please provide your name and your city and your first language and your last language and email and password'});
    } else{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password,salt);
            const tempuser = {name,ucity,uflanguage,uslanguage,email,password:hashedpassword};
            const user = await User.create(tempuser);
            const accesstoken = jwt.sign(
                {userid:user.get('_id'),name:user.get('name')},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'1d'}
            );
            const refreshtoken = jwt.sign(
                {userid:this._id,name:this.name},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )
            res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge:24*60*60*1000});
            res.status(201).json({user,accesstoken});
        } catch (error) {
            res.status(500).json(error);
        }
    } 
}
const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).json({msg:'please provide email and password'});
    }
    try {
        const user = await User.findOne({email});
        const match = await bcrypt.compare(password,user.get('password'));
        if(match){
            const accesstoken = jwt.sign(
                {userid:user.get('_id'),name:user.get('name')},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}
            );
            const refreshtoken = jwt.sign(
                {userid:user.get('_id'),name:user.get('name')},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )
            res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge:24*60*60*1000});
            res.status(201).json({user,accesstoken});
            //res.status(200).json(user);
        } else {
            return res.status(401).json({msg:'invalid credentials'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateuser = async (req,res)=>{
    const id = req.params.id;
    //const createdby = req.user.userid;    ,createdby:createdby
    try {
        const user = await User.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true});
        res.status(200).json({user,count:user.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no user with id ${id}`});
    }
}
const deleteuser = async (req,res)=>{
    const id = req.params.id;
    //const createdby = req.user.userid;     ,createdby:createdby
    try {
        const user = await User.findByIdAndDelete({_id:id},{new:true,runValidators:true});
        res.status(200).json({user,count:user.length});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no user with id ${id}`});
    }
    
}



module.exports = {
    register,
    login,
    updateuser,
    deleteuser
}