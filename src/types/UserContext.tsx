import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    // Inne pola zgodnie z potrzebami
}

interface UserContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    );
};
