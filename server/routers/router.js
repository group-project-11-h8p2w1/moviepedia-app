const express = require("express");
const router = express.Router() ;
const movieRouter = require('./movies')
const UserController = require('../controllers/UserController');
const FavoriteController = require('../controllers/FavoriteController');

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// AUTH
router.use(authentication);
router.use('/movie', movieRouter);
router.post("/favorites", authorization, FavoriteController.addFavMovie);
router.get("/favorites", authorization, FavoriteController.showFavMovie);

module.exports = router;