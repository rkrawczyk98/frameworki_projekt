import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';
import NavBar from '../components/navbar/NavBar';
import { Album } from '../types/Album';
import { Photo } from '../types/Photo';
import { Post } from '../types/Post';
import { User } from '../types/user/User';


//To ma być:
//Strona użytkownika zalogowanego ze wszystkimi danymi, z jego postami, z jego zdjęciami + możliwość edycji danych usera ale tylko zalogowanego

const UserPage: React.FC = () => {
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);   

    const { users } = useAuth();
    const { user } = useAuth();
    const { userId: paramUserId } = useParams();
    const userId = paramUserId ? Number(paramUserId) : user?.id;
    const isCurrentUserProfile = user && user.id === userId;

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logika edycji danych użytkownika
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) { 
                    const foundUser = users.find((u) => u.id === userId);
                    if (foundUser) {
                        setProfileUser(foundUser);

                        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                        const userPosts = await postsResponse.json();
                        setPosts(userPosts);
        
                        const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
                        const userAlbums = await albumsResponse.json();
                        setAlbums(userAlbums);

                        const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos`);
                        const allPhotos = await photosResponse.json();
                        const userPhotos = allPhotos.filter((photo: Photo) => userAlbums.some((album: Album) => album.id === photo.albumId));
                        setPhotos(userPhotos);
                    }
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
    
        fetchData();
    }, [userId, users]);

    if (!user) return <div>Ładowanie danych użytkownika...</div>;

    return (
        <div className="user-page">
            <NavBar></NavBar>
            <h2>Profil Użytkownika</h2>
            <div><strong>Imię i Nazwisko:</strong> {profileUser?.name}</div>
            <div><strong>Nazwa użytkownika:</strong> {profileUser?.username}</div>
            <div><strong>Email:</strong> {profileUser?.email}</div>
            <div><strong>Adres:</strong> {`${profileUser?.address.street}, ${profileUser?.address.city}`}</div>
            <div><strong>Telefon:</strong> {profileUser?.phone}</div>
            <div><strong>Strona WWW:</strong> {profileUser?.website}</div>
            <div><strong>Firma:</strong> {profileUser?.company.name}</div>
            {user?.id && isCurrentUserProfile && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Edytuj Dane</h3>
                    {/* Pola formularza do edycji danych, np. email, telefon */}
                    <input type="email" value={profileUser?.email} /* onChange={handler }*/ />
                    <input type="text" value={profileUser?.phone} /* onChange={handler }*/ />
                    {/* inne pola */}
                    <button type="submit">Zapisz zmiany</button>
                </form>
            )}
            <h2>Posty Użytkownika</h2>
            <div>
                {posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>

            <h2>Albumy Użytkownika</h2>
            <div>
                {albums.map(album => (
                    <div key={album.id}>
                        <h3>{album.title}</h3>
                        <div>
                            {photos.filter(photo => photo.albumId === album.id).map(filteredPhoto => (
                                <img key={filteredPhoto.id} src={filteredPhoto.thumbnailUrl} alt={filteredPhoto.title} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <h2>Zdjęcia Użytkownika</h2>
            <div>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;
