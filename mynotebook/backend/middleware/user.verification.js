const jwt = require('jsonwebtoken')
const JWT_SECRET = 'crimepatrol';


const verifyUsers = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:'Please authenticate using a valid token'});
    } 
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user.id;
    console.log(req.user, user)
    next();
}

module.exports = verifyUsers;