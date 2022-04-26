const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) =>{
    try{
        const token = req.headers["access-token"]
        jwt.verify(token,"yairslonim123");
        next();
    }catch(err)
        {
            res.status(401).json({
                message:"auth failed"
            })
        }
}

module.exports = checkAuth;