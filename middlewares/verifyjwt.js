const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyjwt = (req,res,next) => {
    const authheader = req.headers.authorization;
    if(!authheader){
        return res.status(401);
    }
    console.log(authheader);
    const token = authheader.split(' ')[1];
    try {
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = {userid:payload.userid,name:payload.name};
        next();
    } catch (error) {
        res.status(403).json({error});
    }
}


module.exports = verifyjwt ;