import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { LanguageDetector } from 'i18next-express-middleware';

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/gender_reveal', { useNewUrlParser: true, useUnifiedTopology: true });

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
    preload: ['en', 'uk'],
  });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: Map, of: String },
  team: String,
});

const User = mongoose.model('User', userSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password, avatar } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const message = await i18next.t('errorUserExists');
    res.send({ success: false, message });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, avatar, team: null });
    await newUser.save();
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: await i18next.t('registrationSubject'),
      text: await i18next.t('registrationText', { firstName, lastName }),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send({ success: true });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send({ success: true, user });
    } else {
      const message = await i18next.t('errorInvalidPassword');
      res.send({ success: false, message });
    }
  } else {
    const message = await i18next.t('errorUserNotFound');
    res.send({ success: false, message });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: await i18next.t('restorePasswordSubject'),
      text: await i18next.t('restorePasswordText', { newPassword }),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send({ success: true });
  } else {
    const message = await i18next.t('errorEmailNotFound');
    res.send({ success: false, message });
  }
});

app.post('/api/vote', async (req, res) => {
  const { email, team } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.team = team;
    await user.save();
    res.send({ success: true });
  } else {
    const message = await i18next.t('errorUserNotFound');
    res.send({ success: false, message });
  }
});

app.get('/api/votes', async (req, res) => {
  const boyVotes = await User.countDocuments({ team: 'boy' });
  const girlVotes = await User.countDocuments({ team: 'girl' });
  res.send({ boy: boyVotes, girl: girlVotes });
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
