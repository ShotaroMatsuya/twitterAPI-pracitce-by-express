const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Twit = require('twit');

//init twit

const T = new Twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

app.get('/tweets/:search', (req, res) => {
  T.get(
    'search/tweets',
    { q: req.params.search, count: 5 },
    (err, data, response) => {
      res.json(data);
    }
  );
  console.log(req.params.search);
});
app.post('/comment', (req, res) => {
  console.log(req.body.comment);
  T.post(
    'statuses/update',
    { status: req.body.comment },
    (err, data, response) => {
      console.log(err);
      res.json(data);
    }
  );
});
app.get('/comment/chelsea', (req, res) => {
  const screen_name = 'ChelseaFC';
  T.get(
    'statuses/user_timeline',
    { screen_name: screen_name, count: 4 },
    function (err, data, response) {
      res.json(data);
    }
  );
});

app.listen(3000);
console.log('**RESTART**');
