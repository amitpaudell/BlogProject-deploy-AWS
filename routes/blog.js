const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const { Comment } = require('../models/comment');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-app',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage: storage });

router.get('/add-new', (req, res, next) => {
  return res.render('addBlog', {
    user: req.user,
  });
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    'createdBy',
  );
  console.log(blog);
  console.log(comments);
  return res.render('blog', {
    user: req.user,
    blog,
    comments,
  });
});

router.post('/comment/:blogId', async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post('/', upload.single('coverImage'), async (req, res) => {
  const { title, body } = req.body;
  console.log(req.body);
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: req.file.path,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
