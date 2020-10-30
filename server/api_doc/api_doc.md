# Moviepedia App

**Register User**
----
  Register user on server.

* **URL**

  /register

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    `{
      "id": 1,
      "email": "user@gmail.com"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`


------------------------------------------------------------------------------------


**Login User**
----
  Login user on server.

* **URL**

  /login

* **Method:**
  
  `POST`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Data Params**

   **Required:**

   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

------------------------------------------------------------------------------------

**Add Favorite**
----
  Add favorite Movie.

* **URL**

  /favorites

* **Method:**
  
  `POST`

* **Request Headers**

     ```
    {
      "access_token": "<your access token>"
    }
    ```
  
* **URL Params**
   
  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```
    {
      "access_token": "<your access token>"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Invalid email or password!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

------------------------------------------------------------------------------------

* **GET Movies**

> see all the movies 

* **URL**

  /movie

* **Method:**
  
  `GET`

* **_Request Header_**
```
{
  "accesstoken": "<your access token>"
}
```

* **_Request Body_**
```
not needed
```

* **_Response (200)_**
```
{
    "news": {
        "source": "New York Times",
        "author": "Jason Bailey",
        "title": "Stream These Ultra-Cool Heist Movies",
        "description": "It’s hard to resist the charm of the smooth criminals, confident con artists and bold bank robbers of the caper movie. Enjoy some of the coolest thieves in film."
    },
    "movies": [
        {
            "id": 724989,
            "title": "Hard Kill",
            "poster_path": "https://image.tmdb.org/t/p/w342//ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg"
        },
    ]
}
```

* **_Response (500 - Internal server error)_**
```
{
  "errors": "internal server error"
}
```
------------------------------------------------------------------------------------

* **GET Movie by id**

> Get a specific Movie by id

* **URL**

  /movie/:id

* **Method:**
  
  `GET`

* **_Request Header_**
```
{
  "accesstoken": "<your access token>"
}
```

* **_Request Params_**
```
{
  "id": "<your id>"
}
```

* **_Response (200)_**
```

{
    "id": 400160,
    "title": "The SpongeBob Movie: Sponge on the Run",
    "release_date": "2020-08-14",
    "overview": "When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.",
    "rating": 7,
    "genres": [
        {
            "id": 14,
            "name": "Fantasy"
        },
    ],
    "poster_path": "https://image.tmdb.org/t/p/w342//gxK2lB1w8an5ViPXzisDsRsyHr0.jpg"
}
```

* **_Response (404 - Not Found)_**
```
{
  "errors": "Movie not found"
}
```
* **_Response (500 - Internal server error)_**
```
{
  "errors": "internal server error"
}
```

------------------------------------------------------------------------------------

**GET Search Movie**
----
  looking for the movie you are looking for.

* **URL**

  /movie/search

* **Method:**
  
  `GET`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    {
    "movies": [
        {
            "id": 520763,
            "title": "A Quiet Place Part II",
            "poster_path": "https://image.tmdb.org/t/p/w342//4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg"
        },
        {
            "id": 624963,
            "title": "A Babysitter's Guide to Monster Hunting",
            "poster_path": "https://image.tmdb.org/t/p/w342//bkld8Me0WiLWipLORRNfF1yIPHu.jpg"
        },
    ]
}
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Movie not Found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

------------------------------------------------------------------------------------


**GET upcoming Movie**
----
> see all the movies to come

* **URL**

  /movie/comingSoon

* **Method:**
  
  `GET`

* **Request Headers**

  None
  
* **URL Params**
   
  None

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:**
    {
     "comingSoon": [
        {
            "title": "Greenland",
            "poster_path": "https://image.movieglu.com/308403/DEU_308403h0.jpg",
            "trailer": "https://trailer.movieglu.com/308403_high.mp4",
            "release_dates": "2020-10-29"
        },
        {
            "title": "Jim Button and the Wild 13 (Jim Knopf und die wilde 13)",
            "poster_path": "https://image.movieglu.com/311895/DEU_311895h0.jpg",
            "trailer": null,
            "release_dates": "2020-10-01"
        }
    ]
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`
