import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import { usePhotos } from '../../contexts/PhotoContext';
import { useAlbums } from '../../contexts/AlbumContext';
import { useComments } from '../../contexts/CommentContext';
import { usePosts } from '../../contexts/PostContext';
import { useToDos } from '../../contexts/ToDoContext';
import NavBar from '../../components/navbar/NavBar';
import PhotoSearcher from '../../components/photoSearcher/PhotoSearcher';

const HomePage = () => {
    const { user, fetchUsers } = useAuth();
    const { fetchAlbums } = useAlbums();
    const { fetchPhotos } = usePhotos();
    const { fetchComments } = useComments();
    const { fetchPosts } = usePosts();
    const { fetchToDos } = useToDos();
    const [viewMode, setViewMode] = useState('albums'); // Możliwe wartości: 'albums', 'photos'

    useEffect(() => {
        fetchUsers();
        fetchAlbums();
        fetchPhotos();
        fetchComments();
        fetchPosts();
        fetchToDos();
    }, []);

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

    window.addEventListener("scroll", () => {

        let navbar = document.querySelector("header")
        if(window.pageYOffset >= 1) {
            navbar?.classList.add('scroll-wrapper')
        }
        else if(window.scrollY == 0) {
            navbar?.classList.remove('scroll-wrapper')
        }
    })

    // .scroll-wrapper {
    //     background-color: hsl(181, 100%, 10%);
    //     border-bottom: 1px solid white; 
    //   }

    return (
        <div className="home-page">
            <header>
                <NavBar>
                    <Link to={`/toDosPage`}>Lista aktywności</Link>
                    <Link to={`/postsPage`}>Posty użytkowników</Link>
                    {!user && <Link to="/register">Rejestracja</Link>}
                    {!user && <Link to="/login">Logowanie</Link>}
                    {user && <Link to={`/searchUsers`}>Wyszukiwarka użytkowników</Link>}
                    {user && <Link to={`/user/${user.id}`}>Profil Użytkownika</Link>}
                </NavBar>
            </header>
            <main>
                <div className="photo-feed">
                    <PhotoSearcher/>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Projekt semestalny na przedmiot Frameworki Frontendowe</p>
            </footer>
        </div>
    );
};

export default HomePage;
