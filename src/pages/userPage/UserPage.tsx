import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/UserContext';
import NavBar from '../../components/navbar/NavBar';
import { Album } from '../../types/Album';
import { Photo } from '../../types/Photo';
import { Post } from '../../types/Post';
import { User } from '../../types/user/User';
import AlbumComponent from '../../components/album/Album';
import PhotoComponent from '../../components/photo/Photo';
import { useAlbums } from '../../contexts/AlbumContext';
import { usePhotos } from '../../contexts/PhotoContext';
import { usePosts } from '../../contexts/PostContext';
import PostComponent from '../../components/post/Post';
import styles from './styles.module.css';

const UserPage: React.FC = () => {
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    const { photos } = usePhotos();
    const { albums } = useAlbums();
    const { posts } = usePosts();
    const { users, editUser } = useAuth();
    const { user } = useAuth();
    const { userId: paramUserId } = useParams();
    const userId = paramUserId ? Number(paramUserId) : user?.id;
    const isCurrentUserProfile: boolean = user && user.id === userId ? true : false;

    const [editedName, setEditedName] = useState("");
    const [editedUsername, setEditedUsername] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedAdressStreet, setEditedAdressStreet] = useState("");
    const [editedAdressCity, setEditedAdressCity] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedWebsite, setEditedWebsite] = useState("");
    const [editedCompanyName, setEditedCompanyName] = useState("");
    const [editedCompanyCatchPhrase, setEditedCompanyCatchPhrase] = useState("");
    const [editedCompanyBs, setEditedCompanyBs] = useState("");
    const [editedAdressGeoLat, setEditedAdressGeoLat] =  useState("");
    const [editedAdressGeoLng, setEditedAdressGeoLng] =  useState("");
    const [editedAdressSuite, setEditedAdressSuite] =  useState("");
    const [editedAdressZipCode, setEditedAdressZipCode] = useState("");

    const [viewMode, setViewMode] = useState('albums'); // Możliwe wartości: 'albums', 'photos'

    useEffect(() => {
        if (profileUser) {
            setEditedName(profileUser.name);
            setEditedEmail(profileUser.email);
            setEditedUsername(profileUser.username);
            setEditedAdressStreet(profileUser.address.street)
            setEditedAdressCity(profileUser.address.city)
            setEditedAdressGeoLat(profileUser.address.geo.lat)
            setEditedAdressGeoLng(profileUser.address.geo.lng)
            setEditedAdressSuite(profileUser.address.suite)
            setEditedAdressZipCode(profileUser.address.zipcode)
            setEditedPhone(profileUser.phone)
            setEditedWebsite(profileUser.website)
            setEditedCompanyName(profileUser.company.name)
            setEditedCompanyCatchPhrase(profileUser.company.catchPhrase)
            setEditedCompanyBs(profileUser.company.bs)
        }
    }, [profileUser]);

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (profileUser) {
            const updatedUser = {
                id: profileUser.id,
                password: profileUser.password,
                name: editedName,
                username: editedUsername,
                email: editedEmail,
                address: {
                    street: editedAdressStreet,
                    city: editedAdressCity,
                    suite: editedAdressSuite,
                    zipcode: editedAdressZipCode,
                    geo: {
                        lat: editedAdressGeoLat,
                        lng: editedAdressGeoLng
                    }
                },
                phone: editedPhone,
                website: editedWebsite,
                company:{
                    name: editedCompanyName,
                    catchPhrase: editedCompanyCatchPhrase,
                    bs: editedCompanyBs,
                }
            };
            editUser(updatedUser);
            setProfileUser(updatedUser);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) { 
                    const foundUser = users.filter((u)=>u.id === userId)[0];
                    setProfileUser(foundUser);

                    const userAlbums = albums.filter(album => album.userId === userId);
                    setFilteredAlbums(userAlbums);
            
                    const userPhotos = photos.filter(photo => 
                        userAlbums.some(album => album.id === photo.albumId)
                    );
                    setFilteredPhotos(userPhotos);

                    const userPosts = posts.filter(post => post.userId === userId);
                    setFilteredPosts(userPosts);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };
    
        fetchData();
    }, [userId, albums, photos, posts]);

    if (!user) return <div>Ładowanie danych użytkownika...</div>;

    return (
        <div className={styles.userPage}>
            <NavBar></NavBar>
            <h2>Profil Użytkownika</h2>
            <div className={styles.userInfo}>
                <div><strong>Imię i Nazwisko:</strong> {profileUser?.name}</div>
                <div><strong>Nazwa użytkownika:</strong> {profileUser?.username}</div>
                <div><strong>Email:</strong> {profileUser?.email}</div>
                <div><strong>Adres:</strong> {`${profileUser?.address.street + ','} ${profileUser?.address.city}`}</div>
                <div><strong>Telefon:</strong> {profileUser?.phone}</div>
                <div><strong>Strona WWW:</strong> {profileUser?.website}</div>
                <div><strong>Firma:</strong> {profileUser?.company.name}</div>
            </div>
            {user?.id && isCurrentUserProfile && (
                <form onSubmit={handleEditSubmit} className={styles.editForm}>
                    <h3>Edytuj Dane</h3>
                    <div>
                        <label>Imię i Nazwisko:</label>
                        <input type="name" value={editedName}  onChange={ (e) => setEditedName(e.target.value) } />
                        <label>Nazwa użytkownika:</label>
                        <input type="username" value={editedUsername} onChange={ (e) => setEditedUsername(e.target.value) } />
                        <label>Email:</label>
                        <input type="email" value={editedEmail} onChange={ (e) => setEditedEmail(e.target.value) } />
                        <label>Miasto:</label>
                        <input type="text" value={editedAdressCity} onChange={ (e) => setEditedAdressCity(e.target.value) } />
                        <label>Ulica:</label>
                        <input type="text" value={editedAdressStreet} onChange={ (e) => setEditedAdressStreet(e.target.value) } />
                        <label>Kod pocztowy:</label>
                        <input type="text" value={editedAdressZipCode} onChange={ (e) => setEditedAdressZipCode(e.target.value) } />
                        <label>Numer lokalu:</label>
                        <input type="text" value={editedAdressSuite} onChange={ (e) => setEditedAdressSuite(e.target.value) } />
                        <label>Szerokość geograficzna:</label>
                        <input type="text" value={editedAdressGeoLat} onChange={ (e) => setEditedAdressGeoLat(e.target.value) } />
                        <label>Długość geograficzna:</label>
                        <input type="text" value={editedAdressGeoLng} onChange={ (e) => setEditedAdressGeoLng(e.target.value) } />
                        <label>Telefon:</label>
                        <input type="text" value={editedPhone} onChange={ (e) => setEditedPhone(e.target.value) } />
                        <label>Strona WWW:</label>
                        <input type="text" value={editedWebsite} onChange={ (e) => setEditedWebsite(e.target.value) } />
                        <label>Firma:</label>
                        <input type="text" value={editedCompanyName} onChange={ (e) => setEditedCompanyName(e.target.value) } />
                        <label>Opis firmy:</label>
                        <input type="text" value={editedCompanyBs} onChange={ (e) => setEditedCompanyBs(e.target.value) } />
                        <label>Motto firmy:</label>
                        <input type="text" value={editedCompanyCatchPhrase} onChange={ (e) => setEditedCompanyCatchPhrase(e.target.value) } />
                        <div className={styles.buttonContainer}>
                            <button type="submit">Zapisz zmiany</button>
                        </div>
                    </div>
                </form>
            )}
            <div className={styles.viewSwitch}>
                <button onClick={() => setViewMode('albums')}>Albumy</button>
                <button onClick={() => setViewMode('photos')}>Zdjęcia</button>
            </div>
            {viewMode === 'albums' && <AlbumComponent filteredAlbums={filteredAlbums} showManipulateButtons={isCurrentUserProfile} />}
            {viewMode === 'photos' && <PhotoComponent filteredPhotos={filteredPhotos} showManipulateButtons={isCurrentUserProfile} />}
            <PostComponent filteredPosts={filteredPosts} showManipulateButtons = {isCurrentUserProfile}/>
        </div>
    );
};

export default UserPage;
