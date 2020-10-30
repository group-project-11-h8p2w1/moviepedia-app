const axios = require('axios')

class MovieController {
  static getPopularMovie(req, res, next) {
    let listMovie
    let selectedMovie = []
  
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      params: {
        api_key: 'c795d2b4445cff38a8b9b3b782b69b77'
      }
    })
  
    .then(movies => {
      listMovie = movies.data.results.map(el =>{
        return {
          id: el.id,
          title: el.title,
          poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
        }
      })
      return axios({
        url: 'https://newsapi.org/v2/everything',
        method: 'get',
        params: {
          apiKey: '01e5c7cdc17647f7a9cba22b48469591',
          q: 'movie'
        }
      })
    })
    .then(result => {
      let news = result.data.articles
      let selectedNews = news[Math.floor(Math.random() * news.length)]
      let filteredNews = {
        source: selectedNews.source.name,
        author: selectedNews.author,
        title: selectedNews.title,
        description: selectedNews.description
      }
      
      for (let i = 0; i < 10; i++) {
        selectedMovie.push(listMovie[Math.floor(Math.random() * listMovie.length)])
      }
      res.status(200).json({news: filteredNews, movies: selectedMovie})
    })
    .catch(err => {
      next(err)
    })
  }


  static getComingSoon(req, res, next){
    let listComingSoon 
    axios({
      url: `https://api-gate2.movieglu.com/filmsComingSoon/?n=5`,
      method: 'get',
      headers: {
        client : "HACK_10",
        "x-api-key" : "kQ83cuYOBDxDhBA47k2c8wOAvPg5ME04etFRlT09",
        authorization : "Basic SEFDS18xMDpMcEttMVpTdjBpT0I=",
        territory : "US",
        "api-version" : "v200",
        geolocation : "52.47;-1.93",
        "device-datetime" : "2018-09-14T08:30:17.360Z",
      }
    })
    .then(result => {
      let coming = result.data.films
      listComingSoon = coming
      listComingSoon = coming.map(el => {
        return {
          title: el.film_name,
          poster_path: el.images.poster['1'].medium.film_image,
          trailer: el.film_trailer,
          release_dates: el.release_dates[0].release_date
        }
      })
      res.status(200).json({ comingSoon: listComingSoon})
    })
    .catch(err =>{
      next(err)
    })
  }


  static getOneMovie(req, res, next) {
    const id = req.params.id
    axios({
      url: `https://api.themoviedb.org/3/movie/${id}`,
      method: 'get',
      params: {
        api_key: 'c795d2b4445cff38a8b9b3b782b69b77'
      }
    })
    .then(result => {
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
    const query = req.query.query || 'a'
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

// console.log(MovieController.getComingSoon());

module.exports = MovieController