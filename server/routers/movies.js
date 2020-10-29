const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getPopularMovie)

router.get('/genre', MovieController.findByGenre)

router.get('/search/', MovieController.searchMovie)

router.get('/:id', MovieController.getOneMovie)

module.exports = router