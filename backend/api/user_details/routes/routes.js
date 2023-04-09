// Author: Guru Kiran(gkiran@dal.ca)

const express = require("express");
const router = express.Router();
const user_controller = require('../services/user_details');
const nodemailer = require('nodemailer');

router.get("/", (req, res) => {
    res.send("hello world")
})

router.post("/adduser", async (req, res) => {
    console.log(req.body)
    const db_resp = await user_controller.addUser(req.body);
    console.log(db_resp);
    if (db_resp.success) {
        res.status(200).json(db_resp);
    }
    else {
        res.status(400).json(db_resp);
    }
})

router.post("/getuser", async (req, res) => {
    const db_resp = await user_controller.getUser(req.body);
    console.log(req.body);
    if (db_resp.success) {
        res.status(200).json(db_resp)
    }
    else {
        res.status(400).json(db_resp)
    }
})

router.post("/finduser", async (req, res) => {
    const db_resp = await user_controller.findUser(req.body);

    if (db_resp.success){
        res.status(200).json(db_resp)
    }
    else{
        res.status(400).json(db_resp)
    }
})

router.post("/updateuser", async (req, res) => {
    const db_resp = await user_controller.modifyUser(req.body)
    console.log(db_resp, "/updateuser");

    if(db_resp.success){
        res.status(200).json(db_resp)
    }
    else{
        res.status(400).json(db_resp)
    }
})

router.post("/addevent", async (req, res) => {
    const db_resp = await user_controller.addEventUser(req.body)
    console.log(db_resp, "/addevent");

    if(db_resp.success){
        res.status(200).json(db_resp)
    }
    else{
        res.status(400).json(db_resp)
    }
})

router.post("/fetchevents", async (req, res) => {
    const db_resp = await user_controller.fetchEventsUser(req.body)

    if (db_resp.success){
        res.status(200).json(db_resp)
    }
    else{
        res.status(400).json(db_resp)
    }
})

router.post("/otp", async (req, res) => {
    const to_email = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cryptoproject74@gmail.com',
            pass: 'emzpnspiovlavmud',
        },
      });
    
    const mailOptions = {
        from: 'cryptoproject74@gmail.com',
        to: to_email,
        subject: 'One-Time Password (OTP)',
        text: `Your OTP is ${otp}. Please do not share this OTP with anyone.`,
    };
    transporter.sendMail(mailOptions).then((data) => {
        res.status(200).json({ 'success': true, 'otp': otp });
    }).catch((err) => {
        res.status(400).json({'success': false, 'message': 'Couldn\'t send OTP to the registered email.'})
    });

});

router.post("/addreview", async (req, res) => {
    const db_resp = await user_controller.addReviewUser(req.body)
    console.log(db_resp, "/addreview");

    if(db_resp.success){
        res.status(200).json(db_resp)
    }
    else{
        res.status(400).json(db_resp)
    }
})

router.post("/fetchreviews", async (req, res) => {
    const db_resp = await user_controller.fetchReviewsUser(req.body)

    if (db_resp.success){
        res.status(200).json(db_resp)
    }
    else{
        res.status(400).json(db_resp)
    }
})

module.exports = router;