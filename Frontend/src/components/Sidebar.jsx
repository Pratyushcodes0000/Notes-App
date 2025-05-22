import { useNavigate } from 'react-router-dom';
import './sidebar.css'; // CSS file we'll create

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">📝 MyNotes</h2>

      <div className="sidebar-links">

        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button onClick={() => navigate('/notes')}>📒Make Notes</button>
        <button onClick={() => navigate('/archives')}>🗂️ Archive</button>
        <button onClick={() => navigate('/ai')}>🤖 AI Assistant</button>
      </div>
    </div>
  );
}

export default Sidebar;
