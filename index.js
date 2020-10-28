const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const Twit = require('twit');
const helmet = require('helmet');
const https = require('https');

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

//init twit

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});
app.use(helmet());

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
      console.log("success");
    }
  );
});

// https.createServer({key:privateKey,cert:certificate},app).listen(process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
console.log('**RESTART**');
