import React, { useState, useContext } from 'react';
import { usePhotos } from '../../contexts/PhotoContext';
//import { useAlbums } from '../../contexts/AlbumContext';
import { Photo } from '../../types/Photo';
//import { Album } from '../../types/Album';
import styles from './styles.module.css';

const PhotoSearcher = () => {
    const [searchPhotoId, setSearchPhotoId] = useState('');
    const [searchAlbumId, setSearchAlbumId] = useState('');
    const { photos } = usePhotos();
    //const { albums } = useAlbums();
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);

    const handleSearch = () => {
        let result = photos;

        if (searchPhotoId) {
            result = result.filter(photo => photo.id.toString() === searchPhotoId);
        }

        if (searchAlbumId) {
            result = result.filter(photo => photo.albumId.toString() === searchAlbumId);
        }

        setFilteredPhotos(result);
    };

    return (
        <div>
            <h2>Wyszukiwarka Zdjęć</h2>
            <div>
                <label>ID Zdjęcia: </label>
                <input 
                    value={searchPhotoId} 
                    onChange={e => setSearchPhotoId(e.target.value)}
                    placeholder="Wpisz ID zdjęcia"
                />
                <label>ID Albumu: </label>
                <input 
                    value={searchAlbumId} 
                    onChange={e => setSearchAlbumId(e.target.value)}
                    placeholder="Wpisz ID albumu"
                />
                <button onClick={handleSearch}>Szukaj</button>
            </div>
            <div>
                {filteredPhotos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <p>{photo.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoSearcher;
