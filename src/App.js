import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  // BEM naming convention
  return (
    <div className="app">
      <div className="app__body">
        {/* Sidebar */}
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
