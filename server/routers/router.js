const express = require("express");
const router = express.Router() ;
const UserController = require('../controllers/UserController');

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// AUTH
router.use(authentication);
router.use(authorization);

module.exports = router;