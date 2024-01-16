import React, { useState, useEffect } from 'react';
// Zaimportuj dodatkowe zależności, jeśli są potrzebne

interface UserData {
    id: number;
    username: string;
    email: string;
    // Dodaj inne potrzebne pola
}

const UserPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        // Pobierz dane użytkownika z API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/user'); // Zastąp odpowiednim URL
                const data: UserData = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        };

        fetchData();
    }, []);

    if (!userData) return <div>Ładowanie danych użytkownika...</div>;

    return (
        <div className="user-page">
            <h2>Profil Użytkownika</h2>
            <div>
                <strong>Nazwa użytkownika:</strong> {userData.username}
            </div>
            <div>
                <strong>Email:</strong> {userData.email}
            </div>
            {/* Tutaj możesz dodać więcej informacji o użytkowniku */}
            {/* Opcjonalnie, formularz do edycji danych użytkownika */}
        </div>
    );
};

export default UserPage;
