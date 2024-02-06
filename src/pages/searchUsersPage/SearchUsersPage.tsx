import React from 'react';
import UserSearcher from '../../components/userSearcher/UserSearcher';
import NavBar from '../../components/navbar/NavBar';

const SearchUsersPage = () => {
    return (
        <div>
            <header className='wrapper'>
                <NavBar/>
            </header>
            <UserSearcher />
        </div>
    );
};

export default SearchUsersPage;
