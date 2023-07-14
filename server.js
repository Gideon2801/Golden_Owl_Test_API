const express = require('express');
const route = require('./src/route/route');
const db = require('./src/db/db');
const cors = require('cors');
const env = require('dotenv');

env.config();
const port = process.env.PORT || 5000;

let app = express();

app.use(cors({ credentials: true, origin: true, exposedHeaders: '*' }));

app.use(express.json());

db.connect();

route(app);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
