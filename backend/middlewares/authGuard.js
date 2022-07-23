
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const jwtSecret =  process.env.JWT_SECRET


const authGuard = async (req,res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    // check if header has a token

    if(!token) return res.status(401).json({errors: ["acesso negado"]})

    //check if token is valid

    try {
        const verifid = jwt.verify(token, jwtSecret)
       req.user = await User.findById(verifid.id).select("-password")

       next()

        
    } catch (err) {
        res.status(400).json({errors: ["Token invalido"]})
        
    }



}

module.exports = authGuard
