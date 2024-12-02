const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const JWTauth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        jwt.verify(token, secretKey);
        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid Token'});
    }
}

module.exports = JWTauth;