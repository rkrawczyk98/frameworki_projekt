import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/UserContext";
import NavBar from "../../components/navbar/NavBar";
import { Album } from "../../types/Album";
import { Photo } from "../../types/Photo";
import { Post } from "../../types/Post";
import { User } from "../../types/user/User";
import AlbumComponent from "../../components/album/Album";
import PhotoComponent from "../../components/photo/Photo";
import { useAlbums } from "../../contexts/AlbumContext";
import { usePhotos } from "../../contexts/PhotoContext";
import { usePosts } from "../../contexts/PostContext";
import PostComponent from "../../components/post/Post";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

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
    const isCurrentUserProfile: boolean =
        user && user.id === userId ? true : false;

    const [editedName, setEditedName] = useState("");
    const [editedUsername, setEditedUsername] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedAdressStreet, setEditedAdressStreet] = useState("");
    const [editedAdressCity, setEditedAdressCity] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedWebsite, setEditedWebsite] = useState("");
    const [editedCompanyName, setEditedCompanyName] = useState("");
    const [editedCompanyCatchPhrase, setEditedCompanyCatchPhrase] =
        useState("");
    const [editedCompanyBs, setEditedCompanyBs] = useState("");
    const [editedAdressGeoLat, setEditedAdressGeoLat] = useState("");
    const [editedAdressGeoLng, setEditedAdressGeoLng] = useState("");
    const [editedAdressSuite, setEditedAdressSuite] = useState("");
    const [editedAdressZipCode, setEditedAdressZipCode] = useState("");

    const [viewMode, setViewMode] = useState("albums"); // Możliwe wartości: 'albums', 'photos'

    useEffect(() => {
        if (profileUser) {
            setEditedName(profileUser.name);
            setEditedEmail(profileUser.email);
            setEditedUsername(profileUser.username);
            setEditedAdressStreet(profileUser.address.street);
            setEditedAdressCity(profileUser.address.city);
            setEditedAdressGeoLat(profileUser.address.geo.lat);
            setEditedAdressGeoLng(profileUser.address.geo.lng);
            setEditedAdressSuite(profileUser.address.suite);
            setEditedAdressZipCode(profileUser.address.zipcode);
            setEditedPhone(profileUser.phone);
            setEditedWebsite(profileUser.website);
            setEditedCompanyName(profileUser.company.name);
            setEditedCompanyCatchPhrase(profileUser.company.catchPhrase);
            setEditedCompanyBs(profileUser.company.bs);
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
                        lng: editedAdressGeoLng,
                    },
                },
                phone: editedPhone,
                website: editedWebsite,
                company: {
                    name: editedCompanyName,
                    catchPhrase: editedCompanyCatchPhrase,
                    bs: editedCompanyBs,
                },
            };
            editUser(updatedUser);
            setProfileUser(updatedUser);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const foundUser = users.filter((u) => u.id === userId)[0];
                    setProfileUser(foundUser);

                    const userAlbums = albums.filter(
                        (album) => album.userId === userId
                    );
                    setFilteredAlbums(userAlbums);

                    const userPhotos = photos.filter((photo) =>
                        userAlbums.some((album) => album.id === photo.albumId)
                    );
                    setFilteredPhotos(userPhotos);

                    const userPosts = posts.filter(
                        (post) => post.userId === userId
                    );
                    setFilteredPosts(userPosts);
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, [userId, albums, photos, posts]);

    if (!user) return <div>Ładowanie danych użytkownika...</div>;

    return (
        <div className={styles.userPage}>
            <header className="wrapper">
                <NavBar />
            </header>
            <h1>Profil Użytkownika</h1>
            {user?.id && !isCurrentUserProfile && (
                <div className={styles.userInfo}>
                    <div>
                        <strong>Imię i Nazwisko:</strong> {profileUser?.name}
                    </div>
                    <div>
                        <strong>Nazwa użytkownika:</strong>{" "}
                        {profileUser?.username}
                    </div>
                    <div>
                        <strong>Email:</strong> {profileUser?.email}
                    </div>
                    <div>
                        <strong>Adres:</strong>{" "}
                        {`${profileUser?.address.street + ","} ${
                            profileUser?.address.city
                        }`}
                    </div>
                    <div>
                        <strong>Telefon:</strong> {profileUser?.phone}
                    </div>
                    <div>
                        <strong>Strona WWW:</strong> {profileUser?.website}
                    </div>
                    <div>
                        <strong>Firma:</strong> {profileUser?.company.name}
                    </div>
                </div>
            )}
            {user?.id && isCurrentUserProfile && (
                <form onSubmit={handleEditSubmit} className={styles.editForm}>
                    <h3>Edytuj Dane</h3>
                    <div className={styles.inputsContainer}>
                        <div className="inputContainer">
                            <label>Imię i Nazwisko:</label>
                            <input
                                className={styles.userInput}
                                type="name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Nazwa użytkownika:</label>
                            <input
                                className={styles.userInput}
                                type="username"
                                value={editedUsername}
                                onChange={(e) =>
                                    setEditedUsername(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Email:</label>
                            <input
                                className={styles.userInput}
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Miasto:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedAdressCity}
                                onChange={(e) =>
                                    setEditedAdressCity(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Ulica:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedAdressStreet}
                                onChange={(e) =>
                                    setEditedAdressStreet(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Kod pocztowy:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedAdressZipCode}
                                onChange={(e) =>
                                    setEditedAdressZipCode(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Numer lokalu:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedAdressSuite}
                                onChange={(e) =>
                                    setEditedAdressSuite(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Szerokość geograficzna:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedAdressGeoLat}
                                onChange={(e) =>
                                    setEditedAdressGeoLat(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Długość geograficzna:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedAdressGeoLng}
                                onChange={(e) =>
                                    setEditedAdressGeoLng(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Telefon:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedPhone}
                                onChange={(e) => setEditedPhone(e.target.value)}
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Strona WWW:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedWebsite}
                                onChange={(e) =>
                                    setEditedWebsite(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Firma:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedCompanyName}
                                onChange={(e) =>
                                    setEditedCompanyName(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Opis firmy:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedCompanyBs}
                                onChange={(e) =>
                                    setEditedCompanyBs(e.target.value)
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Motto firmy:</label>
                            <input
                                className={styles.userInput}
                                type="text"
                                value={editedCompanyCatchPhrase}
                                onChange={(e) =>
                                    setEditedCompanyCatchPhrase(e.target.value)
                                }
                            />
                        </div>
                    <button className="button" type="submit">
                        <FontAwesomeIcon
                            icon={["fas", "save"]}
                            size="lg"
                            className={styles.faIconSave}
                        />
                    </button>
                    </div>
                </form>
            )}
            <div className={styles.viewSwitch}>
                <button onClick={() => setViewMode("albums")}>Albumy</button>
                <button onClick={() => setViewMode("photos")}>Zdjęcia</button>
            </div>
            {viewMode === "albums" && (
                <AlbumComponent
                    filteredAlbums={filteredAlbums}
                    showManipulateButtons={isCurrentUserProfile}
                />
            )}
            {viewMode === "photos" && (
                <PhotoComponent
                    filteredPhotos={filteredPhotos}
                    showManipulateButtons={isCurrentUserProfile}
                />
            )}
            <div className={styles.PostComponentContainer}>
                <PostComponent
                    filteredPosts={filteredPosts}
                    showManipulateButtons={isCurrentUserProfile}
                />
            </div>
        </div>
    );
};

export default UserPage;
