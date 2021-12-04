const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userController = require("../controllers/user");
const User = require("../models/user");
const Doubt = require("../models/doubts");
const Ta = require("../models/ta");
require("dotenv").config();
// const {check,validationResult}=require('express-validator');
// const config=require('config');
const nodemailer = require("nodemailer");
const { append } = require("express/lib/response");
const { verifyCookie } = require("../middlewares/verifyCookie");
const { request } = require("express");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    console.log(user);
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.cookie("token", token, { maxAge: 2147483647, httpOnly: true });
        res.status(200).json({
          msg: "success",
          user: {
            id: user.uid,
            name: user.name,
            email: user.email,
            isTeacher: user.isTeacher,
            isModerator: user.isModerator,
            isStudent: user.isStudent,
          },
        });
      } else {
        return res.status(400).json({ msg: "invalid credentials" });
      }
    });
  });
});

router.post("/register", (req, res) => {
  const sendEmail = (email, uniqueString) => {
    console.log("test");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajadarshofficial@gmail.com",
        pass: "eustfncpufrgxzpn",
      },
    });
    var mailOptions = {
      from: "doubt clearing platform",
      to: email,
      subject: "email verification",
      html: `<h1>click on the link to verify your account</h1><a href="http://localhost:8080/api/user/verify/${uniqueString}">click here</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
  const { name, email, password, uid } = req.body;
  if (!name || !email || !password || !uid) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    function String() {
      let string = "";
      for (let i = 0; i < 10; i++) {
        string += getRandomInt(1, 25);
      }
      console.log(string);
      return string;
    }
    function checkVerification(_id) {
      console.log("verification started");
      User.find({ _id })
        .then((doc) => {
          console.log(doc);
          if (doc.verified == false) {
            User.deleteOne(doc)
              .then((r) => console.log(r))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    const uniqueString = String();
    const user = new User({
      name,
      email,
      password: hash,
      uid,
      verified: false,
      uniqueString,
      isStudent: uid.length >= 7 ? true : false,
      isModerator: uid.length == 6 ? true : false,
      isTeacher: uid.length <= 5 ? true : false,
    });
    user
      .save()
      .then((user) => {
        console.log(user.uniqueString);
        sendEmail(email, uniqueString);
        // setTimeout(checkVerification(user._id), 6000);
        res
          .status(200)
          .json({ msg: "check your mail to verify in 15 minutes" });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({ msg: "User already exists" });
        }
        res.status(400).json({ msg: "unable to save user", err });
      });
  });
});

router.get("/user/verify/:uniqueString", userController.verify);
router.post("/logout", userController.logout);

// router.get("/get-doubts", async (req, res) => {
//   //console.log(req.id);
//   const data=await Doubt.find({resolved:false});
//   // return all not accepted doubts and all non resolved doubts
//   res.send(data)
// });

router.get("/getuser", verifyCookie, async (req, res) => {
  try {
    const item = req.user;
    return res.status(200).json({
      msg: "success",
      user: {
        id: item.uid,
        name: item.name,
        email: item.email,
        isTeacher: item.isTeacher,
        isModerator: item.isModerator,
        isStudent: item.isStudent,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

router.post("/register-doubt", verifyCookie, (req, res) => {
  console.log(req.body);
  const doubt = new Doubt({
    question: req.body,
    raisedBy: req.user.id,
    raisedByName: req.user.name,
  });

  doubt
    .save()
    .then((doubt) => {
      res.status(200).json({ msg: "success", doubt });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "error" });
    });
});

router.get("/get-doubts-ta", verifyCookie, async (req, res) => {
  try {
    let doubts = await Doubt.find({ resolved: false });
    doubts = doubts.filter(async (doubt) => {
      const hasTaAcceptedDoubt = await Ta.find({ uid: doubt._id });
      if (hasTaAcceptedDoubt.length > 0) {
        doubt.accepted = true;
      }
      return doubt;
    });
    return res.status(200).json({
      msg: "success",
      doubts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

router.get("/get-doubts", verifyCookie, async (req, res) => {
  try {
    const doubts = await Doubt.find();
    return res.status(200).json({
      msg: "success",
      doubts,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

router.post("/update-accept-doubt", verifyCookie, async (req, res) => {
  try {
    let ta = new Ta({
      id: req.body.id,
      uid: req.user.uid,
    });
    ta.save();
    res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

router.post("/save-answer", verifyCookie, async (req, res) => {
  try {
    let doubt = await Doubt.findById(req.body.doubtId);
    console.log(req.user);
    doubt.answer = req.body.answer;
    doubt.resolved = true;
    doubt.answeredBy = req.user.uid;
    doubt.answeredTime = new Date();
    doubt.save();
    let tt = await Ta.findOneAndUpdate(
      { doubtId: doubt._id, uid: req.user.uid },
      { $set: { resolved: true, timeResolved: new Date() } },
      { new: true, upsert: true }
    );

    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

router.get("/get-dashboard-data", verifyCookie, async (req, res) => {
  try {
    let doubtsAsked = 0,
      doubtsResolved = 0;
    doubtsAsked = await Doubt.count({});
    let temp = await Doubt.find({ resolved: true });
    doubtsResolved = temp.length;
    let moderators = await User.find({ isModerator: true });
    const time = (a, b) => {
      let diff = a - b;
      return Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    };
    let avgTime = 0,
      sum = 0;

    temp.map((doubt) => {
      
      const t= time(doubt.answeredTime.getTime(), doubt.time.getTime());
      console.log(t);
      sum += t;
    });
    avgTime = Math.floor(sum / temp.length);
    let taData = [];
    let doubtsEscalated = await Ta.count({ resolved: false }); // doubt not resolved by ta but accepted
    console.log(doubtsEscalated);
    for (let i = 0; i < moderators.length; i++) {
      let ta = await Ta.find({ uid: moderators[i].uid });
      console.log(ta);
      let acceptedDoubts = ta.length;
      let temp = ta.filter((doubt) => doubt.resolved);
      let resolvedDoubts = temp.length;
      let escalatedDoubts = acceptedDoubts - resolvedDoubts;
      let avgTime = 0,
        sum = 0;

      temp.map((doubt) => {
        sum += time(doubt.timeResolved, doubt.timeAccepted);
      });
      avgTime = Math.floor(sum / temp.length);
      taData.push({
        name: moderators[i].name,
        acceptedDoubts,
        resolvedDoubts,
        escalatedDoubts,
        avgTime,
      });
    }
    res.status(200).json({
      msg: "success",
      doubtsAsked,
      doubtsResolved,
      taData,
      avgTime,
      doubtsEscalated
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

router.post("/save-comment", async (req, res) => {
  try {
    let doubt = await Doubt.findById(req.body._id);
    doubt.comments.push(req.body.comment);
    doubt.save();
    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "error" });
  }
});

module.exports = router;
