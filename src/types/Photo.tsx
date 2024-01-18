import React, { createContext } from 'react';

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const UserDataContext = createContext<Photo | undefined>(undefined);
export default UserDataContext;