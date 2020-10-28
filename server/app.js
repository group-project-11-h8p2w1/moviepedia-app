const express = require("express")
const app = express()
const port = 3000
const router = require('./routers/index')

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(router)

app.listen(port, ()=> {
    console.log(`App is running at ${port}`)
})