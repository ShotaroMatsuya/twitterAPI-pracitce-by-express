const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Twit = require('twit');

//init twit

const T = new Twit({
  consumer_key: 'HodZaffQVo0jQWVqCLQRvZGGP',
  consumer_secret: 'bgCbTIucmZStzwVSJL5BWuzyPIdiiYHlZDIupPtErHNmCRs6sQ',
  access_token: '1312553589965942784-S4srJ3diuMe941bBT2lec9OU0pnlTY',
  access_token_secret: '8rOAYH4SE0dGzoXor9zLwOLbBrEyaFuOvdEb6DJtoutzs',
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.get('/tweets/:search', (req, res) => {
  T.get(
    'search/tweets',
    { q: req.params.search, count: 1 },
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
app.get('/timeline/shotaro', (req, res) => {
  const screen_name = 'Shotaro59432703';
  T.get(
    'statuses/user_timeline',
    { screen_name: screen_name, count: 6 },
    function (err, data, response) {
      res.json(data);
    }
  );
});

app.listen(3000);
console.log('**RESTART**');
