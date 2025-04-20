import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({
        name: "Avishek Adhikary",
        phone: "+91 9876543210",
        email: "john@example.com",
        address: "123 Farm Street, Green Valley, Agriculture City - 700001"
    })

    return (
        <Context.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </Context.Provider>
    );
};

export const AppContext = () => useContext(Context)