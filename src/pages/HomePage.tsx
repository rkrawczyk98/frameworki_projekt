import React from 'react';
import { Link } from 'react-router-dom';
// Import dodatkowych stylów, obrazów itp.

const HomePage = () => {
    return (
        <div className="home-page">
            <header>
                <h1>Projekt semestralny</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Strona Główna</Link></li>
                        <li><Link to="/login">Logowanie</Link></li>
                        <li><Link to="/user">Profil Użytkownika</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2>Witamy na stronie głównej naszego projektu</h2>
                {/* Tutaj możesz dodać treść, np. listę artykułów, slider itp. */}
            </main>
            <footer>
                <p>&copy; 2024 Projekt semestalny na przedmiot Frameworki Frontendowe</p>
                {/* Tutaj możesz dodać linki do kontaktu, informacje o prawach autorskich itp. */}
            </footer>
        </div>
    );
};

export default HomePage;
