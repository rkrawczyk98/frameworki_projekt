import React, { createContext, useState, useContext, useEffect } from 'react';
import { Photo } from '../types/Photo';

interface PhotoContextType {
    photos: Photo[];
    fetchPhotos: () => void;
    addPhoto: (newPhoto: Photo) => void;
    editPhoto: (editedPhoto: Photo) => void;
    deletePhoto: (photoId: number) => void;
}

export const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

interface PhotoProviderProps {
    children: React.ReactNode;
}

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
    //const [photos, setPhotos] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>(() => {
        const savedPhotos = localStorage.getItem('photos');
        return savedPhotos ? JSON.parse(savedPhotos) : null;
    });

    useEffect(() => {
        fetchPhotos();
    }, []);

    useEffect(() => {
        localStorage.setItem('photos', JSON.stringify(photos));
    }, [photos]);

    const fetchPhotos = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            const apiPhotos: Photo[] = await response.json();
            const localPhotos: Photo[] = JSON.parse(localStorage.getItem('photos') || '[]');
            const newApiPhotos = apiPhotos.filter(apiPhoto => 
                !localPhotos.some(localPhoto => localPhoto.id === apiPhoto.id)
            );
            setPhotos([...localPhotos, ...newApiPhotos]);
        } catch (error) {
            console.error('Błąd podczas pobierania photoów:', error);
        }
    };

    const addPhoto = (newPhoto: Photo) => {
        const updatedPhotos = [...photos, newPhoto];
        setPhotos(updatedPhotos);
        localStorage.setItem('photos', JSON.stringify(updatedPhotos));
    };

    const editPhoto = (editedPhoto: Photo) => {
        const updatedPhotos = photos.map(photo => 
            photo.id === editedPhoto.id ? editedPhoto : photo
        );
        setPhotos(updatedPhotos);
        localStorage.setItem('photos', JSON.stringify(updatedPhotos));
    };

    const deletePhoto = (photoId: number) => {
        const updatedPhotos = photos.filter(photo => photo.id !== photoId);
        setPhotos(updatedPhotos);
        localStorage.setItem('photos', JSON.stringify(updatedPhotos));
    };

    return (
        <PhotoContext.Provider value={{ photos, fetchPhotos, addPhoto, editPhoto, deletePhoto }}>
            {children}
        </PhotoContext.Provider>
    );
};

export const usePhotos = () => {
    const context = useContext(PhotoContext);
    if (!context) {
        throw new Error("usePhotos must be used within an PhotoProvider");
    }
    return context;
};
