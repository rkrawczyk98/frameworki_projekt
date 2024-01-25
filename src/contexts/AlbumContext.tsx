import React, { createContext, useState, useContext, useEffect } from 'react';
import { Album } from '../types/Album';

interface AlbumContextType {
    albums: Album[];
    fetchAlbums: () => void;
    addAlbum: (newAlbum: Album) => void;
    editAlbum: (editedAlbum: Album) => void;
    deleteAlbum: (albumId: number) => void;
}

export const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

interface AlbumProviderProps {
    children: React.ReactNode;
}

export const AlbumProvider: React.FC<AlbumProviderProps> = ({ children }) => {
    //const [albums, setAlbums] = useState<Album[]>([]);
    const [albums, setAlbums] = useState<Album[]>(() => {
        const savedAlbums = localStorage.getItem('albums');
        return savedAlbums ? JSON.parse(savedAlbums) : null;
    });

    useEffect(() => {
        fetchAlbums();
    }, []);

    useEffect(() => {
        localStorage.setItem('albums', JSON.stringify(albums));
    }, [albums]);

    const fetchAlbums = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            const apiAlbums: Album[] = await response.json();
            const localAlbums: Album[] = JSON.parse(localStorage.getItem('albums') || '[]');

            if (!Array.isArray(localAlbums)) {
                setAlbums(apiAlbums);
                return; 
            }

            const newApiComments = apiAlbums.filter(apiAlbum => 
                !localAlbums?.some(localAlbum => localAlbum.id === apiAlbum.id)
            );
            setAlbums([...localAlbums, ...newApiComments]);
        } catch (error) {
            console.error('Błąd podczas pobierania albumów:', error);
        }
    };

    const addAlbum = (newAlbum: Album) => {
        const updatedAlbums = [...albums, newAlbum];
        setAlbums(updatedAlbums);
        localStorage.setItem('albums', JSON.stringify(updatedAlbums));
    };

    const editAlbum = (editedAlbum: Album) => {
        const updatedAlbums = albums.map(album => 
            album.id === editedAlbum.id ? editedAlbum : album
        );
        setAlbums(updatedAlbums);
        localStorage.setItem('albums', JSON.stringify(updatedAlbums));
    };

    const deleteAlbum = (albumId: number) => {
        const updatedAlbums = albums.filter(album => album.id !== albumId);
        setAlbums(updatedAlbums);
        localStorage.setItem('albums', JSON.stringify(updatedAlbums));
    };

    return (
        <AlbumContext.Provider value={{ albums, fetchAlbums, addAlbum, editAlbum, deleteAlbum }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbums = () => {
    const context = useContext(AlbumContext);
    if (!context) {
        throw new Error("useAlbums must be used within an AlbumProvider");
    }
    return context;
};
