import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './Notes.css';


const Home = () => {

    const [data,setData] = useState([]);

    useEffect(()=>{
        fetchNotes();
    },[]);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/notes')
            setData(res.data);
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    };



  return (
    <div className='app-container'>
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
                                       
                                    </div>
                                    <h3>{note.title}</h3>
                                    <p>{note.content}</p>
                                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                </div>
                            ))
                        )}
                    </div>
    </div>
  )
}

export default Home