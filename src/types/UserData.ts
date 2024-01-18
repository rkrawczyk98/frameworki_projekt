import React, { createContext } from 'react';
import { Address } from '../types/Address';
import { Company } from '../types/Company';

export interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const UserDataContext = createContext<UserData | undefined>(undefined);
export default UserDataContext;