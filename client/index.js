const SERVER = 'http://localhost:3000'

// Google Sign In
function onSignIn(googleUser) {
  var google_access_token = googleUser.getAuthResponse().id_token;
  console.log(google_access_token);

  $.ajax({
    method: 'POST',
    url: "http://localhost:3000/loginGoogle",
    data: {
      google_access_token
    }
  })
  .done(response => {
    console.log(response);
    let access_token = response.access_token
    localStorage.setItem('access_token', access_token)
    $('#allMovies').show()
    $('#content_navbar').show()
    $('#login_page').hide()
    $('#landing_navbar').hide()
    $('#comingSoonMovie').hide()

    //ngosongin isi form after login
    $('#email_login').val('')
    $('#password_login').val('')

    viewMovies()
  })
  .fail(err => {
    console.log(err);
  })
}

function logout() { // Logout untuk Semua!
  loginPage()
  localStorage.clear();

  // Google Signout di Taruh disini!
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

$(document).ready(function(){
    const access_token = localStorage.getItem('access_token')
    if(access_token){
        viewMovies()
    }else {
        loginPage()
    }
})


function loginPage(){
    $('#login_page').show()
    $('#landing_navbar').show()
    $('#register').hide()
    $('#allMovies').hide()
    $('#homepage_navbar').hide()
    $('#favourites').hide()
    $('#searchMovies').hide()
    $('#selectedMovie').hide()
    $('#comingSoonMovie').hide()
}

function login(e) {

    e.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    
    $.ajax({
        method: 'POST',
        url: `${SERVER}/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        let access_token = response.access_token
        localStorage.setItem('access_token', access_token)
        $('#allMovies').show()
        // $('#content_navbar').show()
        $('#login_page').hide()
        $('#landing_navbar').hide()

        //ngosongin isi form after login
        $('#email_login').val('')
        $('#password_login').val('')

        viewMovies()
    })
    .fail(err => {
        loginPage()
    }) 
}


function registerPage(){
    $('#login_page').hide()
    $('#landing_navbar').show()
    $('#register').show()
    $('#allMovies').hide()
    $('#homepage_navbar').hide()
    $('#favourites').hide()
    $('#searchMovies').hide()
    $('#selectedMovie').hide()
    $('#comingSoonMovie').hide()
}


function register(e){

    e.preventDefault()
    const email = $('#email_register').val()
    const password = $('#password_register').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER}/register`,
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        viewMovies()
    })
    .fail(err => {
        registerPage()
    }) 
}


function movies() {
    $('#login_page').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#allMovies').show()
    $('#homepage_navbar').show()
    $('#favourites').hide()
    $('#searchMovies').hide()
    $('#selectedMovie').hide()
    $('#comingSoonMovie').hide()
}

function viewMovies(){
    movies()
    const access_token = localStorage.getItem('access_token')
    
    $.ajax({
        method: 'GET',
        url: `${SERVER}/movie`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => { 
        // console.log(response)
        $('#news').empty() 
        $('#news').append(`
        <br>
        <h5>Flash News</h5>
        <h4 class="font-weight-bold text-dark">${response.news.title}</h4>
            <p class="text-dark">
                Desc : ${response.news.description}<br>
                Author: ${response.news.author}<br>
                Source: ${response.news.source}<br><br>
            <p>
        `)
        $('#movies').empty() 
        response.movies.forEach(element => {
            $('#movies').append(`
                <div class="movie-card">
                  <div class="movie-header">
                    <img src=${element.poster_path} width="100%" height="100%">
                  </div>
                  <div class="movie-content">
                    <div class="movie-content-header">
                      <a href="#" onclick="selectMovie(${element.id}, event)">
                        <h3 class="movie-title">${element.title}</h3>
                      </a>
                    </div>
                  </div>
                </div>
            `)
        });
    }) 
    .fail(err => {
        console.log(err)
    })
}


function selectMovie(id,e){
    e.preventDefault()
    oneMovie(id,e)

    $('#login_page').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#allMovies').hide()
    $('#homepage_navbar').show()
    $('#selectedMovie').show()
    $('#favourites').hide()
    $('#searchMovies').hide()
    $('#comingSoonMovie').hide()
}

function oneMovie(id,e) {
    const access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'GET',
        url: `${SERVER}/movie/${id}`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        console.log(response)
        $('#selectedMovie').html(
            `
            <h4>${response.title}</h4>
            <img src="${response.poster_path}">
            <p>
                <br>
                Overview : ${response.overview}<br><br>
                Release Date: ${response.release_date}<br><br>
                Genre: ${response.genres[0].name}<br><br>
                Rating: ${response.rating}<br><br>
            <p>
            <button id="button-fav" class="btn btn-outline-success my-2 my-sm-0" onclick="addFavorite(${response.id}, '${response.title}', '${response.poster_path}', event)">Add to Favorites</button>
            `
        )
    })
    .fail(err => {
        console.log(err)
    })

}

function addFavorite(id, title, poster, e) {
  const access_token = localStorage.getItem('access_token')

  $.ajax({
    method: 'POST',
    url: `${SERVER}/favorites`,
    headers: {
        access_token: access_token
    },
    data: {
      MovieId: id,
      title: title,
      poster_path: poster
    }
  })
  .done(response => {
    favourite();
  })
  .fail(err => {
    console.log(err);
  })
}


function favourite(){
    $('#login_page').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#allMovies').hide()
    $('#homepage_navbar').show()
    $('#selectedMovie').hide()
    $('#favourites').show()
    $('#searchMovies').hide()
    $('#comingSoonMovie').hide()

    viewFavourites()
}

function viewFavourites(){
    
    const access_token = localStorage.getItem('access_token')
    
    $.ajax({
        method: 'GET',
        url: `${SERVER}/favorites`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => { 
        // console.log(response)
        $('#fav-movies').empty()
        response.forEach(element => {
            $('#fav-movies').append(`
            <div class="movie-card">
                <div class="movie-header">
                    <img src=${element.poster_path} width="100%" height="100%">
                </div>
                <div class="movie-content">
                    <div class="movie-content-header">
                        <a href="#" onclick="selectMovie(${element.MovieId}, event)">
                        <h3 class="movie-title">${element.title}</h3>
                        </a>
                    </div>
                </div>
                <div class="removeFavorite">
                    <button type="button" onclick="deleteFavoriteMovie(${element.id})" class="btn btn-danger">X</button>
                </div>
            </div>
        `)
        });
    })
    .fail(err => {
        console.log(err)
    })
}

function viewSearch (){
    $('#login_page').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#allMovies').hide()
    $('#homepage_navbar').show()
    $('#selectedMovie').hide()
    $('#favourites').hide()
    $('#searchMovies').show()
    $('#comingSoonMovie').hide()
}

function search(e) {

    viewSearch()

    const access_token = localStorage.getItem('access_token')
    
    e.preventDefault()
    const search_index = $('#search-index').val()
    
    $.ajax({
        method: 'GET',
        url: `${SERVER}/movie/search?query=${search_index}`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
    // console.log(response)
        $('#search_movies').empty()
        response.movies.forEach(element => {
            $('#search_movies').append(`
                <div class="movie-card">
                    <div class="movie-header">
                        <img alt="picture unavailable" src=${element.poster_path} width="100%" height="100%">
                    </div>
                    <div class="movie-content">
                        <div class="movie-content-header">
                            <a href="#" onclick="selectMovie(${element.id}, event)">
                            <h3 class="movie-title">${element.title}</h3>
                            </a>
                        </div>
                    </div>
                </div>
                `)
            });
        })
        .fail(err => {
            console.log(err)
        })
}

function deleteFavoriteMovie(id){

    const access_token = localStorage.getItem('access_token')
    // console.log(id)
    $.ajax({
        url: `${SERVER}/favorites/${id}`,
        method: 'delete',
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        favourite()
    })
    .fail(err => {
        console.log(err)
    })
}

function listComingSoon(){
    $('#login_page').hide()
    $('#landing_navbar').hide()
    $('#register').hide()
    $('#allMovies').hide()
    $('#homepage_navbar').show()
    $('#selectedMovie').hide()
    $('#favourites').hide()
    $('#searchMovies').hide()
    $('#comingSoonMovie').show()

    comingSoon()
}


function comingSoon(){

    const access_token = localStorage.getItem('access_token')

    $.ajax({
        method: 'GET',
        url: `${SERVER}/movie/coming-soon`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => { 
        $('#coming_soon_movies').empty() 
        console.log(response)
        response.comingSoon.forEach(element => {
            $('#coming_soon_movies').append(`
                <div class="movie-card">
                  <div class="movie-header">
                    <img src=${element.poster_path} width="100%" height="100%">
                  </div>
                    <div class="movie-content">
                    <div class="movie-content-header">
                        <h3 class="movie-title">${element.title}</h3><br>
                    </div>
                    <div style="color: white; text-align: center; width: 100%">
                        <p class="movie-released-date" style="display: inline">Released on ${element.release_dates}</p><br>
                        <a href="${element.trailer}">Watch Trailer</a>
                    </div>
                  </div>
                </div>
            `)
        });
    })
    .fail(err => {
        console.log(err)
    })

}