const axios = require('axios')

class MovieController {
  static getPopularMovie(req, res, next) {
    console.log('masuk');
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      params: {
        api_key: 'c795d2b4445cff38a8b9b3b782b69b77'
      }
    })
    .then(movies => {
      console.log('masuk 2');
      let listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      res.status(200).json({ movies: listMovie})
    })
    .catch(err => {
      next(err)
    })
  }

  static getOneMovie(req, res, next) {
    const id = req.params.id
    // const id = 465086
    axios({
      url: `https://api.themoviedb.org/3/movie/${id}`,
      method: 'get',
      params: {
        api_key: 'c795d2b4445cff38a8b9b3b782b69b77'
      }
    })
    .then(result => {
      console.log(result.data);
      const { id, title, release_date, overview, vote_average, genres, poster_path  } = result.data
      const movie = {
        id,
        title,
        release_date,
        overview,
        rating: vote_average,
        genres,
        poster_path: 'https://image.tmdb.org/t/p/w342/' + poster_path 
      }
      return res.status(200).json(movie)
    })
    .catch(err => {
      next(err)
    })
  }
  
  static findByGenre(req, res, next) {
    let genre = req.query.genre
    let genreId
    switch (genre) {
      case 'Action':
        genreId = 28
        break;
      case 'Adventure':
        genreId = 12
        break;
      case 'Horror':
        genreId = 27
        break;
      case 'Crime':
        genreId = 80
        break;
      default:
        genre = 'Comedy'
        genreId = 35
        break;
    }
    console.log(genre);
    axios({
      url: 'https://api.themoviedb.org/3/discover/movie',
      method: 'get',
      params: {
        api_key: 'c795d2b4445cff38a8b9b3b782b69b77',
        with_genres: genreId,
        'vote_average.gte' : 7
      }
    })
    .then(movies => {
      let listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      res.status(200).json({ movie: listMovie})
    })
    .catch(err => {
      next(err)
    })
  }

  static searchMovie(req, res, next) {
    const query = req.query.query
    axios({
      url: `https://api.themoviedb.org/3/search/movie`,
      method: 'get',
      params: {
        api_key: 'c795d2b4445cff38a8b9b3b782b69b77',
        query: query
      }
    })
    .then(movies => {
      let listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      res.status(200).json({ movies: listMovie })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = MovieController