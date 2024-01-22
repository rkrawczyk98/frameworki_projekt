import React, { useState, useEffect } from 'react';
import { User } from '../../types/user/User';
import { useAuth } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const UserSearcher = () => {
    const [searchUserName, setSearchUserName] = useState('');
    const { users } = useAuth();
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const result = users.filter(user => 
            user.name.toLowerCase().includes(searchUserName.toLowerCase())
        );
        setFilteredUsers(result);
    }, [searchUserName, users]); // Efekt uboczny zostanie uruchomiony, gdy zmieni się searchUserName lub users

    const handleUserClick = (userId: number) => {
        navigate(`/user/${userId}`);
    };

    return (
        <div className={styles.searchContainer}>
            <h2 className={styles.searchHeader}>Wyszukiwarka Użytkowników</h2>
            <div>
                <label>Imię i nazwisko: </label>
                <input 
                    className={styles.searchInput}
                    value={searchUserName} 
                    onChange={e => setSearchUserName(e.target.value)}
                    placeholder="Wpisz imię i nazwisko"
                />
            </div>
            <ul className={styles.userList}>
                {filteredUsers.map(user => (
                    <li 
                        key={user.id} 
                        onClick={() => handleUserClick(user.id)} 
                        className={styles.userItem}
                    >
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearcher;
