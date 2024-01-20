import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserPage from '../pages/UserPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/Register';

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {!user && <Route path="/register" element={<RegisterPage />} />}
                {!user && <Route path="/login" element={<LoginPage />} />}
                <Route path="/user/:userId" element={<UserPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
