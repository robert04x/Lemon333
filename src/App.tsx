import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import { Diamond as Lemon } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,237,160,0.3),rgba(255,255,255,0)_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,237,160,0.2),rgba(255,255,255,0)_50%)]" />
          {Array.from({ length: 15 }).map((_, i) => (
            <Lemon
              key={i}
              className="absolute text-yellow-100 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.08,
                fontSize: `${Math.random() * 40 + 20}px`
              }}
            />
          ))}
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;