const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handlerefreshtoken = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(`refresh token ${cookies.jwt}`);
    const refreshtoken = cookies.jwt;

    const founduser = await User.findOne({refreshToken:refreshtoken}).exec();
    console.log(founduser);
    if(!founduser) return res.sendStatus(403);
    jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode) => {
            if(err||founduser.name !== decode.name) return res.sendStatus(403);
            const accesstoken = jwt.sign(
                {
                    "userinfo":{
                        "name":decode.name,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn:'30s' }
            );
            res.json({accesstoken})
        }
    );
}


module.exports = { handlerefreshtoken }