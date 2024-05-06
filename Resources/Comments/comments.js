const express = require('express')
const commentRoutes = express.Router();
const comments = [
    {},
    {}
]
commentRoutes
    // Get all comments
    .get('/', async (req, res) => {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    
    // Get comment by Id
    .get('/:id', async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    // Post a new comment
    .post('/', async (req, res) => {
        const comment = new Comment({
            text: req.body.text
        });
        try {
            const newComment = await comment.save();
            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        
    })
    
    // Update comments (by Id)
    .patch('/:id', async (req, res) => {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedComment) {
                res.json(updatedComment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })

    // Delete comment (by id)
    .delete('/:id', async (req, res) => {
        try {
            const deletedComment = await Comment.findByIdAndDelete(req.params.id);
            if (deletedComment) {
                res.json(deletedComment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })

module.exports = commentRoutes

