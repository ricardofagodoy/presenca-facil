'use strict'
require('app-module-path').addPath(__dirname + '/');

const logger = require('./logger');

/* Express (App and router) */
const express = require('express');
const app = express();
const router = express.Router();

/* Parse JSON on requests */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/*  CORS allow */
const cors = require('cors')
app.use(cors());

/* Database according to NODE_ENV */
const isProd = process.env.NODE_ENV == "prod"
const repository = require('repository/' + (isProd ? "firebase" : "memory") + "Repository")

// Base path is /
app.use('/attendance', router);

/******** Configure all routes ********/

// Log all incoming requests
router.use((req, res, next) => {
  logger.info('%s: %s', req.method, req.url);
  next();
});

// Responds on / with current time
router.get('/', function (req, res) {
  res.end(new Date().getTime().toString());
});

// Responds on /database with all database data (dev)
router.get('/database', function (req, res) {
  res.end(JSON.stringify(repository.getDatabase))
});

require('routes/classRoute')(router, repository);
require('routes/studentRoute')(router, repository);
require('routes/attendanceRoute')(router, repository);

/* Starts up server */
const port = process.env.PORT || 3000
app.listen(port, () => logger.info('Listening on port %s - Prod: %s', port, isProd))

module.exports = app