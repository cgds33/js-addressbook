
// html pages are redirected from this file

"use strict";
var express = require('express');
var router = express.Router();

var pages = require('../services/pages')
var addressBook = require('../services/addressbook_services')
var authorization = require('../services/authorization')

router.get('/', pages.index);
router.get('/api_page', pages.apiPage);
router.get('/whyus', pages.whyus);
router.get('/addressbook', addressBook.addressbook);

router.get('/add_address', addressBook.addAddress);
router.post('/add_address', addressBook.addAddressPost);

// Get request for login/register
router.get('/login', pages.login);
router.get('/register', pages.register);

// Post request for login/register
router.post('/login', authorization.loginPost);
router.post('/register', authorization.registerPost);


module.exports = router;