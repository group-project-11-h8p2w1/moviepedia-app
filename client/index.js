const SERVER = 'http://localhost:3000'


$(document).ready(function(){
    const access_token = localStorage.getItem('access_token')
    if(access_token){
        viewMovies()
    }else {
       loginPage()
    }
})


function loginPage(){
    $('#login').show()
    $('#landing_navbar').show()
    $('#register').hide()
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
        $('#').show()
        $('#content_navbar').show()
        $('#login').hide()
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
    $('#login').hide()
    $('#landing_navbar').show()
    $('#register').show()
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


function viewMovies(){
    `<p>ini di page movies</p>`
}

