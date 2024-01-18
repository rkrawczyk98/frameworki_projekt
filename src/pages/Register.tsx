import React, { useState, useEffect } from 'react';

interface AccountFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    // Dodaj tutaj inne pola z API, jeśli są potrzebne
}

const CreateAccount = () => {
    const [formData, setFormData] = useState<AccountFormData>({ username: '', email: '', password: '', confirmPassword: '' });
    
    const [users, setUsers] = useState(() => {
        const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
        return localUsers;
    });
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Pobieranie użytkowników z API
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const apiUsers: User[] = await response.json();
    
                // Pobieranie użytkowników z localStorage
                const localUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
                // Łączenie listy użytkowników z API i z localStorage
                const combinedUsers = [...localUsers, ...apiUsers];
                setUsers(combinedUsers);
            } catch (error) {
                console.error('Błąd podczas pobierania użytkowników:', error);
            }
        };
    
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Sprawdzenie, czy hasła się zgadzają
        if (formData.password !== formData.confirmPassword) {
            alert('Hasła nie są identyczne!');
            return;
        }
    
        // Sprawdzenie unikalności nazwy użytkownika i emaila
        const isUserExists = users.some((user: User) => user.username === formData.username || user.email === formData.email);

        if (isUserExists) {
            alert('Nazwa użytkownika lub email już istnieje.');
            return;
        }
    
        // Zapisywanie nowego użytkownika
        const newUser = { ...formData, id: users.length + 1 };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    return (
        <div className="register-page">
            <h1>Utwórz Konto</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Potwierdź hasło</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                </div>
                <button type="submit">Utwórz Konto</button>
            </form>
        </div>
        );
    };



export default CreateAccount;