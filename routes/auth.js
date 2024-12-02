const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWTauth = require("../middleware/JWTauth");
const secretKey = process.env.JWT_SECRET;

router.post('/login', (req, res) => {
    const password = req.body.password;
    if (password === process.env.ADMIN_PASSWORD) {
        console.log('password correct', req.body);
        const token = jwt.sign({'auth': 'authorized'}, secretKey)
        res.status(200).json({token});
    } else {
        console.log('password incorrect', req.body);
        res.status(401).send({'error': 'Login failed'});
    }
})

router.post('/check-token', (req, res) => {
    if (jwt.decode(req.headers.authorization)) {
        res.sendStatus(200);
    } else {
        res.status(401).send({'error': 'Invalid Token'});
    }
})

module.exports = router;