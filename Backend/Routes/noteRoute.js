const express = require('express');
const router = express.Router();
const noteController = require('../controller/noteController');
const { validateObjectId } = require('../middleware/validation');

//routes

router.get('/notes', noteController.getNotes);
router.post('/notes', noteController.createNote);

router.get('/notes/:id', validateObjectId, noteController.getNoteById);
router.put('/notes/:id', validateObjectId, noteController.updateNote);
router.delete('/notes/:id', validateObjectId, noteController.deleteNote);
router.patch('/notes/:id', validateObjectId,noteController.partialUpdateNote);

router.patch('/notes/favorite/:id', validateObjectId, noteController.tooggleFav);

module.exports = router;
// This code defines the routes for the note application. It uses Express.js to create a router and defines the following routes: