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

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Email is required!, Wrong email format!, Password length minimum 6 characters!" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal server error!" }`

&nbsp;

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

    ### GET /todos

> Get all todos

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 2,
    "title": "bermain game",
    "description": "mobile lejen",
    "status": "undone",
    "due_date": "2020-10-29T00:00:00.000Z",
    "userId": 4,
    "createdAt": "2020-10-27T04:25:39.378Z",
    "updatedAt": "2020-10-27T09:43:19.354Z"
  },
  {
    "id": 6,
    "title": "menanam ubi",
    "description": "di halaman belakang",
    "status": "undone",
    "due_date": "2020-12-03T00:00:00.000Z",
    "userId": 4,
    "createdAt": "2020-10-27T07:42:54.553Z",
    "updatedAt": "2020-10-27T09:43:36.773Z"
  }
]
```

_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```
---
### GET /movie:id

> Get a specific todo by id

_Request Header_
```
{
  "accesstoken": "<your access token>"
}
```

_Request Params_
```
{
  "id": "<your id>"
}
```

_Response (200)_
```
{
  "id": 2,
  "title": "bermain game",
  "description": "mobile lejen",
  "status": "undone",
  "due_date": "2020-10-29T00:00:00.000Z",
  "userId": 4,
  "createdAt": "2020-10-27T04:25:39.378Z",
  "updatedAt": "2020-10-27T09:43:19.354Z"
}
```

_Response (404 - Not Found)_
```
{
  "errors": "todo not found"
}
```
_Response (500 - Internal server error)_
```
{
  "errors": "internal server error"
}
```