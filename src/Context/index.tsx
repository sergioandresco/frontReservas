import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({
    accessToken: null,
    setAccessToken: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        setAccessToken(Cookies.get('accessToken'));
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
