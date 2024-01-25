import React, { createContext } from 'react';

export interface Album {
    userId: number;
    id: number;
    title: string;
}

const UserDataContext = createContext<Album | undefined>(undefined);
export default UserDataContext;