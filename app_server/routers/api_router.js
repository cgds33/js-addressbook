
// API service's requests are redirected from this file

"use strict";
var express = require('express');
var router = express.Router();
var api = require('../services/api_services')


router.post('/add_address', api.addAddress);
router.get('/fetch/by_name',api.fetchByName);
router.get('/fetch/email',api.fetchByEmail);
router.get('/fetch/phone',api.fetchByPhone);
router.get('/fetch/all',api.fetchAll);
router.delete('/delete/by_name',api.deleteByName);
router.patch('/update_address',api.updateAddress)

module.exports = router;