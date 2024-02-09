import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import UserPage from "../pages/userPage/UserPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import RegisterPage from "../pages/registerPage/Register";
import SearchUsersPage from "../pages/searchUsersPage/SearchUsersPage";
import PostsPage from "../pages/postsPage/PostsPage";
import ToDosPage from "../pages/toDosPage/ToDosPage";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {!user && <Route path="/register" element={<RegisterPage />} />}
                {!user && <Route path="/login" element={<LoginPage />} />}
                <Route path="/searchUsers" element={<SearchUsersPage />} />
                <Route path="/user/:userId" element={<UserPage />} />
                <Route path="/postsPage" element={<PostsPage />} />
                <Route path="/toDosPage" element={<ToDosPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
