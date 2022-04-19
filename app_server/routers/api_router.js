
// API service's requests are redirected from this file

"use strict";
var express = require('express');
var router = express.Router();
var api = require('../services/api_services')


router.get('/adduser', api.addUser);

module.exports = router;