const mongoose = require('mongoose');

//schema
const NoteSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
   
},{timestamps:true});

//model 
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;