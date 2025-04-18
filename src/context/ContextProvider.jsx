import React, { createContext, useContext, useState } from 'react';

const Context = createContext({

});

export const ContextProvider = ({ children }) => {
    // const [user, setUser] = useState({})

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    );
};

export const AppContext = () => useContext(Context)