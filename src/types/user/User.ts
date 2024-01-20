import React, { createContext } from 'react';
import { Address } from './Address';
import { Company } from './Company';

export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const User = createContext<User | undefined>(undefined);
export default User;