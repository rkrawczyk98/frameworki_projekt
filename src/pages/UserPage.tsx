import React, { useState, useEffect } from 'react';
import { Address } from '../types/Address';
import { Company } from '../types/Company';
import { Post } from '../types/Post';
import { Photo } from '../types/Photo';
import { UserData } from '../types/UserData';


//To ma być:
//Strona użytkownika zalogowanego ze wszystkimi danymi, z jego postami, z jego zdjęciami + możliwość edycji danych usera ale tylko zalogowanego

const UserPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);    

    const userId = 1; //strona użytkownika - fajnie gdyby była z linka - wtedy może sobie wejść jakiś inny gość i przejrzeć profil
    const isUserLoggedIn = true; // Do logiki sprawdzajacej czy użytkownik jest zalogowany
    const loggedInUserId = 1; // Id zalogowanego użytkownika - jest potrzebne aby sprawdzić czy jest to konto akutalnie zalogowanego użytkownika

    const isCurrentUserProfile = userData && userData.id === loggedInUserId;

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logika edycji danych użytkownika
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const userData: UserData = await userResponse.json();
                setUserData(userData);
    
                const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const userPosts = await postsResponse.json();
                setPosts(userPosts);
    
                const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`);
                const userPhotos = await photosResponse.json();
                setPhotos(userPhotos);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
    
        fetchData();
    }, [userId]);

    if (!userData) return <div>Ładowanie danych użytkownika...</div>;

    return (
        <div className="user-page">
            <h2>Profil Użytkownika</h2>
            <div><strong>Imię i Nazwisko:</strong> {userData.name}</div>
            <div><strong>Nazwa użytkownika:</strong> {userData.username}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Adres:</strong> {`${userData.address.street}, ${userData.address.city}`}</div>
            <div><strong>Telefon:</strong> {userData.phone}</div>
            <div><strong>Strona WWW:</strong> {userData.website}</div>
            <div><strong>Firma:</strong> {userData.company.name}</div>
            {isUserLoggedIn && isCurrentUserProfile && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Edytuj Dane</h3>
                    {/* Pola formularza do edycji danych, np. email, telefon */}
                    <input type="email" value={userData.email} /* onChange={handler }*/ />
                    <input type="text" value={userData.phone} /* onChange={handler }*/ />
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
