import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { User } from '../types/user/User';
import { useAuth } from '../contexts/UserContext';
import NavBar from '../components/navbar/NavBar';

interface AccountFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const CreateAccount = () => {
    const [formData, setFormData] = useState<AccountFormData>({ username: '', email: '', password: '', confirmPassword: '' });
    const { users, addUser, fetchUsers } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
        const maxId = users.reduce((max, user) => user.id > max ? user.id : max, 0);
        const newUser: User = {
            id: maxId + 1,
            username: formData.username,
            email: formData.email,
            name: formData.username,
            password: formData.password,
            address: {
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                    lat: '',
                    lng: ''
                }
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        };
        
        if (newUser) {
            addUser(newUser);
            navigate('/');
        } else {
            alert('Niepoprawne dane rejestracji.');
        }

    };

    return (
        <div className="register-page">
            <NavBar></NavBar>
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