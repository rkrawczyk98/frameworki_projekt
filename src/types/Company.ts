import React, { createContext } from 'react';

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

const UserDataContext = createContext<Company | undefined>(undefined);
export default UserDataContext;