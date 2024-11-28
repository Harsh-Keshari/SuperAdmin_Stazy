import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/USer.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
import dotenv from 'dotenv'
dotenv.config()


import nodemailer from 'nodemailer'

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: "User already existed!" })
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpassword
    })

    await newUser.save()
    return res.json({ status: true, message: "Registered Successfully" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: "User is not Registered" })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({ message: "Password is incorrect" })
    }
    const tokenData = {
        username: user.username,
    }
    const token = await jwt.sign(tokenData, process.env.KEY, { expiresIn: '1h' })
    // res.cookie("token", token, { httpOnly: true, maxAge: 360000 })
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
        sameSite: "strict",
    });
    return res.json({ status: true, message: "Login Successful" });

})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ message: "User not registered yet!" })
        }
        // console.log("hi")

        const tokenData = {
            username: user.username,
        }

        const token = await jwt.sign(tokenData, process.env.KEY, { expiresIn: '1h' })
        // console.log(token)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'harshkeshari768@gmail.com',
                pass: 'nnihnfreghmxjxvc'
            }
        });

        var mailOptions = {
            from: 'harshkeshari768@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending Email" })
            } else {
                return res.json({ status: true, message: "Email sent" })
            }
        });
    } catch (err) {
        console.log(err)
    }
})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
        return res.json({ status: true, message: "Password updated" })
    } catch (err) {
        return res.json("Invalid Token")
    }
})

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "No token" })
        }
        const decoded = await jwt.verify(token,process.env.Key);
        next()
    }catch(err){
        return res.json(err)
    }

}



router.get('/verify', verifyUser, (req, res) => {
    return res.json({status:true, message: "authorized"})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true})
})

export { router as UserRouter }
