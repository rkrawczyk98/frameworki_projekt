import React, { createContext } from 'react';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const UserDataContext = createContext<Post | undefined>(undefined);
export default UserDataContext;