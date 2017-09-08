// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const port = process.env.PORT || '3010';
const host = process.env.HOST || '0.0.0.0';
const corsConfig = {
  origin: '*',
  optionsSuccessStatus: 200,  
};

app.use(cors(corsConfig));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', api);

app.listen(port, host, () => console.log(`API gateway running on ${host}:${port}`));
