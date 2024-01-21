import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/user/User';

interface AuthContextType {
    user: User | null;
    users: User[];
    loginUser: (userData: User) => void;
    logoutUser: () => void;
    fetchUsers: () => void;
    addUser: (newUser: User) => void;
    editUser: (editedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = sessionStorage.getItem('loggedUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [users, setUsers] = useState<User[]>(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : null;
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const loginUser = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem('loggedUser', JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        sessionStorage.removeItem('loggedUser');
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const apiUsers: User[] = await response.json();
            const localUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
            const newApiUsers = apiUsers.filter(apiUser => 
                !localUsers.some(localUser => localUser.id === apiUser.id)
            );
            setUsers([...localUsers, ...newApiUsers]);
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
        }
    };

    const addUser = (newUser: User) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const editUser = (editedUser: User) => {
        const updatedUsers = users.map(user => 
            user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
    
    return (
        <AuthContext.Provider value={{ user, users, loginUser, logoutUser, fetchUsers, addUser, editUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
