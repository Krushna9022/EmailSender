// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT||3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Email route
app.post('/send-email', async (req, res) => {
  const { name, propertyType, email, mobile} = req.body;

  // Create transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.secretemail,     // 🔒 replace with your email
      pass: process.env.secretPass       // 🔒 or app password if using 2FA
    }
  });

  // Email content
  let mailOptions = {
    from: email,
    to: 'ajaypande9335@gmail.com',
    subject: 'New Form Submission',
    html: `
      <h3>New Enquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Prpperty type:</strong>${propertyType}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
