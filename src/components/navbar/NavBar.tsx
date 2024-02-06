import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/UserContext';
import styles from './styles.module.css';


interface NavBarProps {
    children?: React.ReactNode;
}

window.addEventListener("scroll", () => {

    let navbar = document.querySelector("header")
    if(window.pageYOffset >= 1) {
        navbar?.classList.add('scroll-wrapper')
    }
    else if(window.scrollY == 0) {
        navbar?.classList.remove('scroll-wrapper')
    }
})

function NavBar({ children }: NavBarProps) {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }
    
    
    return (
        <div className={styles.wrapper}>
            <Link to='/' className={`${styles.aBtn} ${styles.homeLink}`}>Projekt semestralny</Link>
            <div className={`${styles.btnSegment} ${styles.children}`}>
                {children}
                {user && <button className={styles.btn} onClick={handleLogout}>Wyloguj</button>}
            </div>
        </div>
    )
}


export default NavBar;
