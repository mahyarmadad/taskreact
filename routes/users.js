const express = require('express')
const router = express.Router();
const User = require("../databse/User");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register a user 
const errorFormatter = ({ msg }) => { return `${msg}`; };
router.post('/', [
    check('username', "Please Enter a Username").not().isEmpty(),
    check('email', "Please Enter a Valid Email").isEmail(),
    check('password', "Please enter a Password with atleast 6 Charector").isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { username, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(500).json({ msg: "User alreaady exist , Login! " });
            }
            user = new User({ username, email, password });
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(password, salt);
            user.save();
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