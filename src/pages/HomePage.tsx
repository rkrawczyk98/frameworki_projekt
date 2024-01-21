import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';
import { usePhotos } from '../contexts/PhotoContext';
import { useAlbums } from '../contexts/AlbumContext';
import NavBar from '../components/navbar/NavBar';
import AlbumComponent from '../components//album/Album';
import PhotoComponent from '../components/photo/Photo';
import PhotoSearcher from '../components/photoSearcher/PhotoSearcher';

const HomePage = () => {
    const { user } = useAuth();
    const { albums } = useAlbums();
    const { photos } = usePhotos();
    const [viewMode, setViewMode] = useState('albums'); // Możliwe wartości: 'albums', 'photos'

    // useEffect(() => {
    //     // Pobieranie danych ze zdjęciami
    //     const fetchPhotos = async () => {
    //         try {
    //             const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    //             setPhotos(response.data);
    //         } catch (error) {
    //             console.error('Błąd podczas pobierania zdjęć:', error);
    //         }
    //     };

    //     fetchPhotos();
    // }, []);

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
                    <PhotoSearcher/>
                    {/* <div>
                        <button onClick={() => setViewMode('albums')}>Albumy</button>
                        <button onClick={() => setViewMode('photos')}>Zdjęcia</button>
                    </div>
                    {viewMode === 'albums' && <AlbumComponent filteredAlbums={albums} showManipulateButtons={false} />}
                    {viewMode === 'photos' && <PhotoComponent filteredPhotos={photos} showManipulateButtons={false} />} */}
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Projekt semestalny na przedmiot Frameworki Frontendowe</p>
            </footer>
        </div>
    );
};

export default HomePage;
