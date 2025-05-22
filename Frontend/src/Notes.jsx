import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import './Notes.css';

const Notes = () => {

    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const [activeSection, setActiveSection] = useState("all-notes");
    const [isLoading, setIsLoading] = useState(true);
    //editing notes
    const [editingNote, setEditingNote] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
   

    const createNote = async () => {
        if (!title.trim() || !content.trim()) {
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:8000/api/notes', {
                title: title,
                content: content
            });
            console.log(response);
            setTitle("");
            setContent("");
            fetchNotes();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:8000/api/notes')
            setData(res.data);
            console.log(data);
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/notes/${id}`);
            fetchNotes();
            setTitle("");
            setContent("");
        } catch (error) {
            console.error(error);
        }
    };

    const updateNote = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/notes/${id}`, {
                title: editTitle,
                content: editContent
            });
            console.log(response);
            setEditingNote(null);
            setEditTitle("");
            setEditContent("");
            fetchNotes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (note) => {
        setEditingNote(note);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleCloseEdit = () => {
        setEditingNote(null);
        setEditTitle("");
        setEditContent("");
    };

  

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            createNote();
        }
    };

    const toggleFavorite = async (note) => {
        try {
            setIsTogglingFavorite(true);
            const res = await axios.patch(`http://localhost:8000/api/notes/favorite/${note._id}`, {
                isFavorite: !note.isFavorite 
            });
            console.log('Favorite toggled:', res.data);
            fetchNotes();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setIsTogglingFavorite(false);
        }
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <div className="container">
                    <div className="input-section">
                        <input
                            placeholder="Enter title here"
                            className="title"
                            required={true}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <textarea
                            placeholder="Enter content here"
                            className="content"
                            required={true}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            onClick={createNote} 
                            className="button"
                            disabled={isLoading || !title.trim() || !content.trim()}
                        >
                            <span>{isLoading ? "Adding..." : "Add Note"}</span>
                        </button>
                    </div>
                    <div className="output">
                        {data.length === 0 ? (
                            <div className="empty-state">
                                <h3>No Notes Yet</h3>
                                <p>Start by creating your first note above!</p>
                            </div>
                        ) : (
                            data.map(note => (
                                <div key={note._id} className="note-card">
                                    <div className="note-actions">
                                        <button 
                                            className="note-action-btn"
                                            onClick={() => deleteNote(note._id)}
                                            title="Delete note"
                                        >
                                            🗑️
                                        </button>
                                        <button 
                                            className="note-action-btn"
                                            onClick={() => handleEditClick(note)}
                                            title="Edit note"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            className="note-action-btn"
                                            onClick={() => toggleFavorite(note)}
                                            title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                            disabled={isTogglingFavorite}
                                        >
                                            {note.isFavorite ? "⭐" : "☆"}
                                        </button>
                                    </div>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            {/* Edit Card Overlay */}
            <div className={`edit-card-overlay ${editingNote ? 'active' : ''}`}>
                <div className="edit-card">
                    <div className="edit-card-header">
                        <h2>Edit Note</h2>
                        <button className="edit-card-close" onClick={handleCloseEdit}>✕</button>
                    </div>
                    <div className="edit-card-content">
                        <input
                            placeholder="Enter title here"
                            className="title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Enter content here"
                            className="content"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                    </div>
                    <div className="edit-card-actions">
                        <button className="cancel-btn" onClick={handleCloseEdit}>Cancel</button>
                        <button 
                            className="save-btn"
                            onClick={() => updateNote(editingNote._id)}
                            disabled={!editTitle.trim() || !editContent.trim()}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notes;