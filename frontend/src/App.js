import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Animals from './pages/Animals';
import Reservations from './pages/Reservations';
import LoginPage from './pages/LoginPage';
import BackToTop from './components/BackToTop'; // Импортируем якорь

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/login" element={<LoginPage />} /> 
       
      </Routes>
      <BackToTop /> {/* Добавляем якорь */}
    </Router>
  );
}

export default App;
