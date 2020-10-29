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
  $('#login_page').show()
  $('#landing_navbar').show()
  $('#register').hide()
  $('#allMovies').hide()
  $('#homepage_navbar').hide()
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
        response.movies.forEach(element => {
            $('#movies').append(
                `
                <tr>
                    <th scope="row"><img src=${element.poster_path} width="40%" height="40%" onclick="selectMovie(${element.id}, event)"></th>
                    <td>${element.title}</td>
                </tr>
                `
            )
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
    .done(response => {`
        <h4>${response.title}</h4>
        <img src="${response.poster_path}>
        <p>
            Overview : ${response.overview}
            Release Date:${response.release_date}
            Genre: ${response.genres}
            Rating: ${response.rating}
        <p>
        `
    })
    .fail(err => {
        console.log(err)
    })


}