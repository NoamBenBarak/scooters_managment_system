import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    // Load login state from localStorage on initial render
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedLoggedIn === 'true') {
            setLoggedIn(true);
        }
    }, []);

    // Update localStorage whenever the login state changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
