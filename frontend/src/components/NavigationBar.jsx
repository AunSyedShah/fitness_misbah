// NavigationBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">AppName</Link>
        <div>
          <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
          <Link to="/workouts" className="text-white mr-4">Workouts</Link>
          <Link to="/nutrition" className="text-white mr-4">Nutrition</Link>
          <Link to="/progress" className="text-white mr-4">Progress</Link>
          {currentUser ? (
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
