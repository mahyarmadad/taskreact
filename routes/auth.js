const express = require('express')
const router = express.Router();
const auth = require("../Auth");
const User = require("../databse/User");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Get User
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.log(err.message);
        res.send(500).send("Server Error");
    }
});

//Login User
router.post('/', [
    check('email', "Please Enter a Valid Email").isEmail(),
    check('password', "Please enter a Password").exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(500).json({ msg: "Invalid Credentials" });
            }
            const matchpass = bcrypt.compareSync(password, user.password);
            if (!matchpass) {
                return res.status(500).json({ msg: "Invalid Credentials" });
            }

            jwt.sign({ user: { id: user.id } }, process.env.JWTSECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (error) {
            console.log(error.mesaage);
            res.status(500).send("Server Error");
        }
    });
module.exports = router;
