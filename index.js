const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/blogify')
  .then((e) => console.log('Mongodb Connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/user', userRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
