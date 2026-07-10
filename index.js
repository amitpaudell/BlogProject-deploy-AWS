const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const Blog = require('./models/blog');
const {
  checkForAuthenticationCookie,
} = require('./middlewares/authentication');
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/blogify')
  .then((e) => console.log('Mongodb Connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
