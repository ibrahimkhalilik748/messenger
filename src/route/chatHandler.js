const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const chatSchema = require('../schemas/chatSchema');
const Chat = new mongoose.model('Chat', chatSchema);





//get all the Chat
router.get('/', async (req, res) => {
    await Chat.find().select({ __v: 0 }).exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                data,
                message: "Get Successful",
            });
        }
    })
})

//get a Chat by ID
router.get('/:id', async (req, res) => {
    await Chat.find({ _id: req.params.id }).select({ __v: 0 }).exec((err, data) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else { 
            res.status(200).json({
                data: data,
                message: "Get Successful",
            });
        }
    })
})

//post Chat
router.post('/', async (req, res) => {
    const newChat = new Chat(req.body);
    await newChat.save((err) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                message: "Post Successful",
            });
        }
    });
})

//put Chat
router.put('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (chat) {
            chat.message = req.body.message;
            await chat.save();
            res.status(200).send({
                message: 'success'
            });
        }
    } catch (err) {
        res.status(404).send({
            message: err.message,
        });
    }
})

//Delete Chat
router.delete('/:id', async (req, res) => {
    await Chat.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "this is Error",
            });
        } else {
            res.status(200).json({
                message: "Delete Successful",
            });
        }
    })
})



module.exports = router;