import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [user, setUser] = useState({
        name: "Avishek Adhikary",
        phone: "9876543210",
        email: "john@example.com",
        address: "123 Farm Street, Green Valley, Agriculture City - 700001"
    })
    const [seller, setSeller] = useState({
        businessName: "Green Valley Farms",
        ownerName: "Avishek Adhikary",
        phone: "9876543210",
        email: "greenvalley@example.com",
        areaLocation: "123 Farm Street, Green Valley, Agriculture City - 700001",
        licenseNumber: "FARM123456",
        yearsInBusiness: "5",
        businessType: "Wholesale Supplier",
        registrationDate: "2020-04-26",
        verificationStatus: "Verified",
        rating: 4.5,
        totalOrders: 150,
        bankDetails: {
            accountName: "Green Valley Farms",
            accountNumber: "XXXX XXXX 1234",
            bankName: "State Bank of India",
            ifscCode: "SBIN0001234"
        }
    })

    return (
        <Context.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, seller, setSeller }}>
            {children}
        </Context.Provider>
    );
};

export const AppContext = () => useContext(Context)