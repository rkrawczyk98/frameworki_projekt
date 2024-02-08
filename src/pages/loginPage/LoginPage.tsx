import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useAuth }  from '../../contexts/UserContext';
import NavBar from '../../components/navbar/NavBar';

interface LoginFormData {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
    const { loginUser } = useAuth();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((user: any) => user.username === formData.username && user.password === formData.password);

        if (foundUser) {
            loginUser(foundUser);
            navigate('/');
        } else {
            alert('Niepoprawne dane logowania');
        }
    };

    return (
        <div className="login-page">
            <header>            
                <NavBar>
                    {!user && <Link to="/register">Rejestracja</Link>}
                </NavBar>
            </header>

                <h1 className="loginHeader">Logowanie</h1>
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="form-group">
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="loginInput"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="loginInput"
                    />
                </div>
                <button className="loginButton" type="submit">Zaloguj się</button>
            </form>
        </div>
    );
};

export default LoginPage;
