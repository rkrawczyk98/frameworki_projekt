import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';
import NavBar from '../components/navbar/NavBar';
import { Photo } from '../types/Photo';

const HomePage = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        // Pobieranie danych ze zdjęciami
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
                setPhotos(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania zdjęć:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div className="home-page">
            <header>
                <NavBar>
                    {!user && <Link to="/login">Logowanie</Link>}
                    {!user && <Link to="/register">Rejestracja</Link>}
                    <Link to={`/postsPage`}>Posty użytkowników</Link>
                    {user && <Link to={`/searchUsers`}>Wyszukiwarka użytkowników</Link>}
                    {user && <Link to={`/user/${user.id}`}>Profil Użytkownika</Link>}
                </NavBar>
                <h1>Projekt semestralny</h1>
            </header>
            <main>
                <h2>Witamy na stronie głównej naszego projektu</h2>
                <div className="photo-feed">
                    {photos.map(photo => (
                        <div key={photo.id} className="photo">
                            <h3>{photo.title}</h3>
                            <img src={photo.url} alt={photo.title} />
                        </div>
                    ))}
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Projekt semestalny na przedmiot Frameworki Frontendowe</p>
            </footer>
        </div>
    );
};

export default HomePage;
