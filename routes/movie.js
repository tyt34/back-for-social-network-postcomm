const router = require('express').Router();
const {
  creMovValidator, getMovValidator,
} = require('../middlewares/validators');
const {
  createMovie, delMovie, getMovies,
} = require('../controllers/movie');

router.post('/movies', creMovValidator, createMovie);
router.delete('/movies/:movieId', getMovValidator, delMovie);
router.get('/movies', getMovies);

module.exports = router;
