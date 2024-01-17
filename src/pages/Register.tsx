import React, { useState } from 'react';

interface AccountFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const CreateAccount = () => {
    const [formData, setFormData] = useState<AccountFormData>({ username: '', email: '', password: '', confirmPassword: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dodaj tutaj logikę tworzenia konta (np. walidacja, wysyłanie do API)
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