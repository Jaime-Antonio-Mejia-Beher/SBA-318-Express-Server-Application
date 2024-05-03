/*
const express = require('express')
const postsRoutes = express.Router()
const Post = require('../../models/post.js');

const posts = [
{
    userId: 1,
    title: "Todays topic",
    message: ""

}
]

postsRoutes
    
    // .get((req, res) => {
    //     res.json(posts)
    // })
    // .post((req, res) => {

    // })

    // // Get all posts
    // .route('/posts')
    // .get((req, res) => {})
    .post('/', async (req, res) => {
        // Identify who is logged in
        const { userId, title, message } = req.body;

        try {
            // Create a new post instance
            const newPost = new Post({ userId, title, message });
    
            // Save the post to the database
            await newPost.save();
    
            res.json({ success: true, message: 'Post created successfully', data: newPost });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ success: false, message: 'Error creating post' });
        }
    })
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
*/

const express = require('express');
const postsRoutes = express.Router();
const Post = require('../../models/post.js');
const jwt = require('jsonwebtoken');

// Create a new post
postsRoutes.post('/', async (req, res) => {
    const { title, message } = req.body;

    // Get the user ID from the JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const userId = decodedToken.user.id;

    try {
        // Create a new post instance with the user ID
        const newPost = new Post({ userId, title, message });

        // Save the post to the database
        await newPost.save();

        res.json({ success: true, message: 'Post created successfully', data: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Error creating post' });
    }
});

module.exports = postsRoutes;
