import React, { useState } from "react";
import { usePhotos } from "../../contexts/PhotoContext";
import { Photo } from "../../types/Photo";
import { useAlbums } from "../../contexts/AlbumContext";
import { useAuth } from "../../contexts/UserContext";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

interface PhotoComponentProps {
    filteredPhotos: Photo[];
    showManipulateButtons: boolean;
}

const PhotoComponent: React.FC<PhotoComponentProps> = ({
    filteredPhotos,
    showManipulateButtons,
}) => {
    const { photos, addPhoto, editPhoto, deletePhoto } = usePhotos();
    const [newPhotoTitle, setNewPhotoTitle] = useState("");
    const [newPhotoUrl, setNewPhotoUrl] = useState("");
    const [newPhotoThumbnailUrl, setNewPhotoThumbnailUrl] = useState("");
    const [newPhotoAlbumId, setNewPhotoAlbumID] = useState<number | null>(null);
    const [editPhotoId, setEditPhotoId] = useState<number | null>();
    const [editPhotoTitle, setEditPhotoTitle] = useState("");
    const [editPhotoUrl, setEditPhotoUrl] = useState("");
    const [editPhotoThumbnailUrl, setEditPhotoThumbnailUrl] = useState("");
    const { albums } = useAlbums();
    const { user } = useAuth();

    const handleAddPhoto = () => {
        if (user?.id) {
            const newPhoto: Photo = {
                albumId: newPhotoAlbumId
                    ? newPhotoAlbumId
                    : Math.max(...albums?.map((a) => a.id), 0) + 1,
                id: Math.max(...photos?.map((p) => p.id), 0) + 1,
                title: newPhotoTitle,
                url: newPhotoUrl,
                thumbnailUrl: newPhotoThumbnailUrl,
            };
            addPhoto(newPhoto);
            resetForm();
        } else {
            alert("Aby dodawać albumy musisz być zalogowanym użytkownikiem.");
        }
    };

    const handleEditPhoto = (photo: Photo) => {
        setEditPhotoId(photo.id);
        setEditPhotoTitle(photo.title);
        setEditPhotoUrl(photo.url);
        setEditPhotoThumbnailUrl(photo.thumbnailUrl);
    };

    const handleSaveEdit = () => {
        const photoToEdit = filteredPhotos.find((p) => p.id === editPhotoId);
        if (photoToEdit && user?.id) {
            editPhoto({
                id: photoToEdit?.id,
                albumId: photoToEdit?.albumId,
                title: editPhotoTitle,
                url: editPhotoUrl,
                thumbnailUrl: editPhotoThumbnailUrl,
            });
            resetEditForm();
        } else {
            alert("Aby edytować zdjęcia musisz być zalogowanym użytkownikiem.");
        }
    };

    const resetForm = () => {
        setNewPhotoTitle("");
        setNewPhotoUrl("");
        setNewPhotoThumbnailUrl("");
    };

    const resetEditForm = () => {
        setEditPhotoId(null);
        setEditPhotoTitle("");
        setEditPhotoUrl("");
        setEditPhotoThumbnailUrl("");
    };

    const handleDeletePhoto = (photoId: number) => {
        deletePhoto(photoId);
    };

    return (
        <div className="queryContainer">
            <h2>Zdjęcia</h2>
            {showManipulateButtons && user && (
                <div className={styles.addButton}>
                    <form className={styles.addButtonForm}>
                        <input
                            value={newPhotoTitle}
                            onChange={(e) => setNewPhotoTitle(e.target.value)}
                            placeholder="Tytuł"
                        />
                        <input
                            placeholder="Numer Albumu"
                            value={
                                newPhotoAlbumId !== null
                                    ? newPhotoAlbumId.toString()
                                    : ""
                            }
                            onChange={(e) =>
                                setNewPhotoAlbumID(
                                    e.target.value
                                        ? parseInt(e.target.value, 10)
                                        : null
                                )
                            }
                        />
                        <input
                            placeholder="Adres Url postu"
                            value={newPhotoUrl}
                            onChange={(e) => setNewPhotoUrl(e.target.value)}
                        />
                        <input
                            placeholder="Adres Url miniaturki:"
                            value={newPhotoThumbnailUrl}
                            onChange={(e) =>
                                setNewPhotoThumbnailUrl(e.target.value)
                            }
                        />
                    </form>
                    <button className="newPhotoButton" onClick={handleAddPhoto}>
                        <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                    </button>
                </div>
            )}
            <div className={styles.photoGallery}>
                {filteredPhotos?.map((photo) => (
                    <div key={photo.id} className={styles.photoContainer}>
                        {editPhotoId === photo.id &&
                        showManipulateButtons &&
                        user &&
                        photo.albumId ===
                            albums?.filter((a) => a.userId === user?.id)[0]
                                ?.id ? (
                            <div className={styles.editForm}>
                                <label>Tytuł: </label>
                                <input
                                    value={editPhotoTitle}
                                    onChange={(e) =>
                                        setEditPhotoTitle(e.target.value)
                                    }
                                />
                                <label>Adres Url postu: </label>
                                <input
                                    value={editPhotoUrl}
                                    onChange={(e) =>
                                        setEditPhotoUrl(e.target.value)
                                    }
                                />
                                <label>Adres Url miniaturki: </label>
                                <input
                                    value={editPhotoThumbnailUrl}
                                    onChange={(e) =>
                                        setEditPhotoThumbnailUrl(e.target.value)
                                    }
                                />
                                <button onClick={handleSaveEdit}>Zapisz</button>
                            </div>
                        ) : (
                            <div>
                                <img
                                    src={photo.thumbnailUrl}
                                    alt={photo.title}
                                    className={styles.photoImage}
                                />
                                <div className={styles.photoDetails}>
                                    <label>Tytuł:</label>
                                    <span>{photo.title}</span>
                                </div>
                                {showManipulateButtons &&
                                user &&
                                photo.albumId ===
                                    albums?.filter(
                                        (a) => a.userId === user?.id
                                    )[0]?.id ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleEditPhoto(photo)
                                            }
                                        >
                                            Edytuj
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeletePhoto(photo.id)
                                            }
                                        >
                                            Usuń
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoComponent;
