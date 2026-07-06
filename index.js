const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
  res.render('home');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
