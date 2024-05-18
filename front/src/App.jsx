import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './assets/hogwarts.png';
import './App.css';
import Dashboard from './Dashboard';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
