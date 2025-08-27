const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ✅ Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", ContactSchema);

// ✅ Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save in DB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // Nodemailer Transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // ✅ Correct email structure
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // always your Gmail
      replyTo: email, // user’s email for reply
      to: process.env.EMAIL_USER, // send to yourself
      subject: "New Contact Form Query",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    });

    res.json({ success: true, msg: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
