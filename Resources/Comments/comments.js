const express = require('express')
const commentRoutes = express.Router();
const comments = [
    {},
    {}
]
commentRoutes
    .route('/')
    .get((req, res) => {
        // the comments for a particular post
    })
    .post((req, res) => {
        // adding a new comment
    //     if (comments.forEach( ()=>{
        
    })

module.exports = commentRoutes

