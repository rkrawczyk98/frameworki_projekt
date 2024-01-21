import React, { useState, useEffect } from 'react';
import { User } from '../../types/user/User';
import { useAuth } from '../../contexts/UserContext';

const UserSearcher = () => {
    const [searchUserName, setSearchUserName] = useState('');
    const { users } = useAuth();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        const result = users.filter(user => 
            user.name.toLowerCase().includes(searchUserName.toLowerCase())
        );
        setFilteredUsers(result);
    }, [searchUserName, users]); // Efekt uboczny zostanie uruchomiony, gdy zmieni się searchUserName lub users


    return (
        <div>
            <h2>Wyszukiwarka Użytkowników</h2>
            <div>
                <label>Imię i nazwisko: </label>
                <input 
                    value={searchUserName} 
                    onChange={e => setSearchUserName(e.target.value)}
                    placeholder="Wpisz imię i nazwisko użytkownika"
                />
            </div>
            <div>
                {filteredUsers.map(user => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSearcher;
