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

// Get all posts
postsRoutes.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
})

// Get posts by Id
postsRoutes.get('/;id', (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error fetching post by Id:', error);
        res.status(500).json({ success: false, message: 'Error fetching post by Id' });
    }
})

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


// update a post (need Id)
postsRoutes.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, message } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, message }, { new: true });
        if (updatedPost) {
            res.json({ success: true, message: 'Post updated successfully', data: updatedPost });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ success: false, message: 'Error updating post' });
    }
})

// delete a post (need Id)
postsRoutes.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (deletedPost) {
            res.json({ success: true, message: 'Post deleted successfully', data: deletedPost });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ success: false, message: 'Error deleting post' });
    }
})

module.exports = postsRoutes;
