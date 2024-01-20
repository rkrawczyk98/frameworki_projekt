import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/UserContext';
import styles from './styles.module.css';

interface NavBarProps {
    children?: React.ReactNode;
}

function NavBar({ children }: NavBarProps) {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }

    return (
        <div className={styles.wrapper}>
            <Link to='/' className={`${styles.aBtn} ${styles.homeLink}`}>Strona główna</Link>
            <div className={`${styles.btnSegment} ${styles.children}`}>
                {children}
                {user && <button className={styles.btn} onClick={handleLogout}>Wyloguj</button>}
            </div>
        </div>
    )
}

export default NavBar;
