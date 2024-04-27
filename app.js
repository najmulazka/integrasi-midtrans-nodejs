const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const { midtrans } = require('./controllers/midtrans.controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.render('form.ejs');
});

app.post('/bayar', midtrans);

app.listen(PORT, () => console.log('Running on port', PORT));
