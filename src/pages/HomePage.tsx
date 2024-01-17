import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Definiuj typ dla danych zdjęcia
interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const HomePage = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);

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
                <h1>Projekt semestralny</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Strona Główna</Link></li>
                        <li><Link to="/login">Logowanie</Link></li>
                        <li><Link to="/register">Rejestracja</Link></li>
                        <li><Link to="/user">Profil Użytkownika</Link></li>
                    </ul>
                </nav>
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
