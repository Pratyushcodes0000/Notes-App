const Note = require('../models/NoteModel');

// Create note with validation
exports.createNote = async (req, res) => {
    try {
        console.log('Received POST request:', req.body);
        const { title, content } = req.body;
        
        if (!title || !content) {
            console.log('Validation failed: Missing title or content');
            return res.status(400).json({ message: 'Title and content are required' });
        }

        console.log('Creating note with:', { title, content });
        const note = await Note.create({ title, content });
        console.log('Note created successfully:', note);
        res.status(201).json(note);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single note
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update note
exports.updateNote = async (req, res) => {
    try {
        const { title,content } = req.body;
        
        if (!title && !content) {
            return res.status(400).json({ message: 'At least one field (title or content) is required for update' });
        }

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Partial update note
exports.partialUpdateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.tooggleFav = async (req, res) => {
        try {
          const note = await Note.findById(req.params.id);
      
          if (!note) {
            return res.status(404).json({ message: 'Note not found' });
          }
      
          note.isFavorite = !note.isFavorite; // toggle true/false

          await note.save();
      
          res.json(note);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }  
};


// This code defines the note controller for a note-taking application. It includes functions to create, read, update, and delete notes, as well as toggle the favorite status of a note. Each function handles errors and sends appropriate responses to the client. The code uses Mongoose to interact with a MongoDB database and assumes that a Note model has been defined in a separate file.