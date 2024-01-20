import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';

const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-page">
            <NavBar></NavBar>
            <h1>404</h1>
            <h2>Strona nie znaleziona</h2>
            <p>Przepraszamy, strona, której szukasz, nie istnieje.</p>
            <Link to="/">Powrót do strony głównej</Link>
        </div>
    );
};

export default NotFoundPage;
