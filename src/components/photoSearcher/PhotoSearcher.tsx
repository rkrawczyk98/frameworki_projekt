import React, { useState } from 'react';
import { usePhotos } from '../../contexts/PhotoContext';
import { useAlbums } from '../../contexts/AlbumContext';
import PhotoComponent from '../photo/Photo';
import AlbumComponent from '../album/Album';
import styles from './styles.module.css';

const PhotoSearcher = () => {
    const [searchPhotoId, setSearchPhotoId] = useState('');
    const [searchAlbumId, setSearchAlbumId] = useState('');
    const [searchUserId, setSearchUserId] = useState('');
    const { photos } = usePhotos();
    const { albums } = useAlbums();
    const [viewMode, setViewMode] = useState('photos'); // 'photos' lub 'albums'

    // const filteredAlbums = albums.filter(album => {
    //     const photoById = photos.filter(p => p.id.toString() === searchPhotoId)[0];
    //     return (searchPhotoId ? albums.filter(a => a.id === photoById.albumId)[0] : true) &&
    //            (searchAlbumId ? album.id.toString() === searchAlbumId : true) &&
    //            (searchUserId ? album.userId.toString() === searchUserId : true);
    // });

    // const filteredPhotos = photos.filter(photo => {
    //     const albumsByUser = filteredAlbums.filter(album => album.userId.toString() === searchUserId).map(a => a.id);
    //     return (searchPhotoId ? photo.id.toString() === searchPhotoId : true) &&
    //            (searchAlbumId ? photo.albumId.toString() === searchAlbumId : true) &&
    //            (searchUserId ? albumsByUser.includes(photo.albumId) : true);
    // });

    const filteredAlbums = albums.filter(album => {
        return (searchAlbumId ? album.id.toString() === searchAlbumId : true) &&
               (searchUserId ? album.userId.toString() === searchUserId : true);
    });
    
    const filteredPhotos = photos.filter(photo => {
        return (searchPhotoId ? photo.id.toString() === searchPhotoId : true) &&
               filteredAlbums.some(album => album.id === photo.albumId);
    });

    let albumsFilteredAfterPhotos;
    if (viewMode === 'albums' && searchPhotoId) {
    albumsFilteredAfterPhotos = filteredAlbums.filter(a => a.id === filteredPhotos[0]?.albumId);
    } else {
    albumsFilteredAfterPhotos = filteredAlbums;
    }


    return (
        <div className={styles.photoSearcher}>
            <h2>Wyszukiwarka Zdjęć</h2>
            <div>
                <label>ID Zdjęcia: </label>
                <input value={searchPhotoId} onChange={e => setSearchPhotoId(e.target.value)} placeholder="ID zdjęcia" />
                <label>ID Albumu: </label>
                <input value={searchAlbumId} onChange={e => setSearchAlbumId(e.target.value)} placeholder="ID albumu" />
                <label>ID Użytkownika: </label>
                <input value={searchUserId} onChange={e => setSearchUserId(e.target.value)} placeholder="ID użytkownika" />
                <button onClick={() => setViewMode('photos')}>Zdjęcia</button>
                <button onClick={() => setViewMode('albums')}>Albumy</button>
            </div>
            {viewMode === 'photos' && <PhotoComponent filteredPhotos={filteredPhotos} showManipulateButtons={false} />}
            {viewMode === 'albums' && <AlbumComponent filteredAlbums={albumsFilteredAfterPhotos ? albumsFilteredAfterPhotos : filteredAlbums.filter(a => a.id === filteredPhotos[0].albumId)} showManipulateButtons={false} />}
        </div>
    );
};

export default PhotoSearcher;
