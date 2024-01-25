import React, { createContext } from 'react';

export interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const UserDataContext = createContext<ToDo | undefined>(undefined);
export default UserDataContext;