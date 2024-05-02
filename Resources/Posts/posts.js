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
    // .get((req, res) => {
    //     res.json(posts)
    // })
    // .post((req, res) => {

    // })

    // // Get all posts
    // .route('/posts')
    // .get((req, res) => {})
    // .post((req, res) => {})
    // .patch((req, res) => {})
    // .delete((req, res) => {})

    // // Get specific post by its ID
    // .route('/posts/:id')
    // .get((req, res) => {})
    // .post((req, res) => {})
    // .patch((req, res) => {})
    // .delete((req, res) => {})

    
module.exports = postsRoutes

// ('/mongoDb')
// ('/html')
// ('/javascript')

