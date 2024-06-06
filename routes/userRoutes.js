const router = require('express').Router();
const User = require('../models/Users')
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcryptjs')

//register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, repassword } = req.body;

        //find user
        const user = await User.findOne({ username })

        //check if user already exist
        if (user) {
            return res.status(400).json("username already exist")
        }

        //check if password match
        if (password !== repassword) {
            return res.status(401).json({ error: "password does not match" })
        }

        //hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        //create new user
        const newUser = new User({ username, email, password: hashedpassword, repassword: hashedpassword })
        const data = await newUser.save()
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //find user by email
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid email ' });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid  password" });
        }

        //token
        const payload = {
            id: user.id,
            isAdmin: user.isAdmin
        }
        const token = generateToken(payload)
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//get all admins
router.get('/alladmins', async (req, res) => {
    try {
        const admins = await User.find({ isAdmin: true })
        res.status(200).json(admins)
    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = router