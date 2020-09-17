const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
  // this is the ship the user's email rides
  var transport = nodemailer.createTransport({
    host: process.env.FEEDBACK_EMAIL_HOST,
    port: process.env.FEEDBACK_EMAIL_PORT,
    auth: {
      user: process.env.FEEDBACK_EMAIL_USERNAME, 
      pass: process.env.FEEDBACK_EMAIL_PASSWORD
    },
  });

  // this is what has been typed by the user
  // comes from client > FeedbackForm.js
  let mailOptions = {
    subject: 'We Sparkle User Feedback',
    // to: is the email address we want to recieve the emails 
    to: process.env.FEEDBACK_EMAIL_ADDRESS,
    html: `<p>From: ${req.body.userName}</p>
           <p>Email: ${req.body.userEmail}</p>
           <p>Message: ${req.body.emailBody}</p>`,
  };

  // send that email!
  transport.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log("Error occurred:", err.message);
    }
    res.send(data.response);
    return console.log("Email sent!!! Response:", data.response);
  });
});

module.exports = router;
