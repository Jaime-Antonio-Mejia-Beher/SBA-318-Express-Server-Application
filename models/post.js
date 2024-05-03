const mongoose = require('mongoose')

/*
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', userSchema);    
module.exports = Post;
*/


// Define post schema
const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: String
});

// Create and export post model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;