import React, { createContext } from 'react';

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

const UserDataContext = createContext<Address | undefined>(undefined);
export default UserDataContext;