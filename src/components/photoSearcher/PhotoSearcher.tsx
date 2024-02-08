import React, { useState } from "react";
import { usePhotos } from "../../contexts/PhotoContext";
import { useAlbums } from "../../contexts/AlbumContext";
import PhotoComponent from "../photo/Photo";
import AlbumComponent from "../album/Album";
import styles from "./styles.module.css";

const PhotoSearcher = () => {
    const [searchPhotoId, setSearchPhotoId] = useState("");
    const [searchAlbumId, setSearchAlbumId] = useState("");
    const [searchUserId, setSearchUserId] = useState("");
    const { photos } = usePhotos();
    const { albums } = useAlbums();
    const [viewMode, setViewMode] = useState("photos");

    const filteredAlbums = albums?.filter((album) => {
        return (
            (searchAlbumId ? album.id.toString() === searchAlbumId : true) &&
            (searchUserId ? album.userId.toString() === searchUserId : true)
        );
    });

    const filteredPhotos = photos?.filter((photo) => {
        return (
            (searchPhotoId ? photo.id.toString() === searchPhotoId : true) &&
            filteredAlbums.some((album) => album.id === photo.albumId)
        );
    });

    let albumsFilteredAfterPhotos;
    if (viewMode === "albums" && searchPhotoId) {
        albumsFilteredAfterPhotos = filteredAlbums?.filter(
            (a) => a.id === filteredPhotos[0]?.albumId
        );
    } else {
        albumsFilteredAfterPhotos = filteredAlbums;
    }

    return (
        <div className={styles.photoSearcherContainer}>
            <h2>Wyszukiwarka Zdjęć</h2>
            <div className={styles.searchContainer}>
                <div className="form-group">
                    <label>Numer zdjęcia:</label>
                    <input
                        value={searchPhotoId}
                        onChange={(e) => setSearchPhotoId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Numer albumu:</label>
                    <input
                        value={searchAlbumId}
                        onChange={(e) => setSearchAlbumId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Numer użytkownika:</label>
                    <input
                        value={searchUserId}
                        onChange={(e) => setSearchUserId(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.switchViewButtons}>
                <button onClick={() => setViewMode("photos")}>Zdjęcia</button>
                <button onClick={() => setViewMode("albums")}>Albumy</button>
            </div>
            {viewMode === "photos" && (
                <PhotoComponent
                    filteredPhotos={filteredPhotos}
                    showManipulateButtons={true}
                />
            )}
            {viewMode === "albums" && (
                <AlbumComponent
                    filteredAlbums={
                        albumsFilteredAfterPhotos
                            ? albumsFilteredAfterPhotos
                            : filteredAlbums.filter(
                                  (a) => a.id === filteredPhotos[0].albumId
                              )
                    }
                    showManipulateButtons={true}
                />
            )}
        </div>
    );
};

export default PhotoSearcher;
