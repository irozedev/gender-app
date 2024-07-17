import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/gender_reveal', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  nickname: String,
  avatar: String,
  team: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/nickname', async (req, res) => {
  const { nickname, avatar } = req.body;
  const newUser = new User({ nickname, avatar, team: null });
  await newUser.save();
  res.send({ success: true });
});

app.post('/api/vote', async (req, res) => {
  const { nickname, team } = req.body;
  const user = await User.findOne({ nickname });
  if (user) {
    user.team = team;
    await user.save();
    res.send({ success: true });
  } else {
    res.send({ success: false, message: 'Пользователь не найден' });
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
