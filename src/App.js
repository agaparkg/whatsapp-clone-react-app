import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './styles/App.css';
import Login from './components/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/" />
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
