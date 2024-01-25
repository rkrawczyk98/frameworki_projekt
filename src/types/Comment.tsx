import React, { createContext } from 'react';

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email:string;
    body:string;
}

const UserDataContext = createContext<Comment | undefined>(undefined);
export default UserDataContext;