import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

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
