const express = require('express')
const postsRoutes = express.Router()
const posts = [
{
    userId: 1,
    title: "Todays topic",
    message: ""

}
]

postsRoutes
    .route('/')
    .get((req, res) => {
        res.json(posts)
    })
    .post()

module.exports = postsRoutes

