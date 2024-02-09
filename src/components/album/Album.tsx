import React, { useState, useEffect } from "react";
import { useAlbums } from "../../contexts/AlbumContext";
import { Album } from "../../types/Album";
import { useAuth } from "../../contexts/UserContext";
import { usePhotos } from "../../contexts/PhotoContext";
import Photo from "../../components/photo/Photo";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

interface AlbumComponentProps {
    filteredAlbums: Album[];
    showManipulateButtons: boolean;
}

const AlbumComponent: React.FC<AlbumComponentProps> = ({
    filteredAlbums,
    showManipulateButtons,
}) => {
    const { albums, addAlbum, editAlbum, deleteAlbum } = useAlbums();
    const [newAlbumTitle, setNewAlbumTitle] = useState("");
    const [editAlbumTitle, setEditAlbumTitle] = useState("");
    const [editAlbumId, setEditAlbumId] = useState<number | null>(null);
    const { user } = useAuth();
    const { photos } = usePhotos();
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
    const selectedAlbumPhotos = selectedAlbumId
        ? photos.filter((photo) => photo.albumId === selectedAlbumId)
        : [];

    const handleAlbumClick = (albumId: number) => {
        if (selectedAlbumId === albumId) {
            setSelectedAlbumId(null);
        } else {
            setSelectedAlbumId(albumId);
        }
    };

    const handleAddAlbum = () => {
        if (user?.id) {
            const newAlbum: Album = {
                userId: user.id,
                id: Math.max(...albums?.map((a) => a.id), 0) + 1,
                title: newAlbumTitle,
            };
            addAlbum(newAlbum);
            setNewAlbumTitle("");
        } else {
            alert("Aby dodawać albumy musisz być zalogowanym użytkownikiem.");
        }
    };

    const handleEditAlbum = (album: Album) => {
        setEditAlbumId(album.id);
        setEditAlbumTitle(album.title);
    };

    const handleSaveEdit = () => {
        if (editAlbumId && user?.id) {
            editAlbum({
                userId: user.id,
                id: editAlbumId,
                title: editAlbumTitle,
            });
            setEditAlbumId(null);
            setEditAlbumTitle("");
        } else {
            alert("Aby edytować albumy musisz być zalogowanym użytkownikiem.");
        }
    };

    return (
        <div>
            <h2>Albumy</h2>
            {showManipulateButtons && (
                <div className={styles.addButton}>
                    <input
                        className={styles.newAlbumInput}
                        value={newAlbumTitle}
                        onChange={(e) => setNewAlbumTitle(e.target.value)}
                        placeholder="Nazwa nowego albumu"
                    />
                    <button className="newTodoButton" onClick={handleAddAlbum}>
                        <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                    </button>
                </div>
            )}
            <div className={styles.wrapper}>
                {filteredAlbums?.map((album) => (
                    <div
                        key={album.id}
                        className={styles.albumWrapper}
                        onClick={() => handleAlbumClick(album.id)}
                    >
                        {editAlbumId === album.id && showManipulateButtons ? (
                            <div className={styles.editForm}>
                                <label>Tytuł: </label>
                                <input
                                    value={editAlbumTitle}
                                    onChange={(e) =>
                                        setEditAlbumTitle(e.target.value)
                                    }
                                />
                                <button onClick={handleSaveEdit}>Zapisz</button>
                            </div>
                        ) : (
                            <div className={styles.albumDetails}>
                                <label>Tytuł: </label>
                                <span>{album.title}</span>
                                <label>Numer albumu: </label>
                                <span>{album.id}</span>
                            </div>
                        )}
                        {selectedAlbumId === album.id && (
                            <div className="photosContainer">
                                <Photo
                                    filteredPhotos={selectedAlbumPhotos}
                                    showManipulateButtons={false}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumComponent;
