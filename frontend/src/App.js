import React, { useEffect } from 'react';
import {  useNavigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Animals from './pages/Animals';
import Reservations from './pages/Reservations';
import LoginPage from './pages/LoginPage';
import BackToTop from './components/BackToTop'; // Импортируем якорь
import AnimalDetails from './pages/AnimalDetails';

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const expirationTime = sessionStorage.getItem('expirationTime');
    
    if (expirationTime && Date.now() > expirationTime) {
      sessionStorage.clear();
      alert("Your session has expired. Please log in again.");
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/animals/:id" element={<AnimalDetails />} /> {/* Используем element вместо component */}
        <Route path="/login" element={<LoginPage />} /> 
      </Routes>
      <BackToTop /> {/* Добавляем якорь */}
    </>
  );
}

export default App;
