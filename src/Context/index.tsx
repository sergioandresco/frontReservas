import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  accessToken: string | null;
  userId: string | null; // Agrega userId al contexto
  setAccessToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void; // Agrega setUserId al contexto
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  userId: null, // Inicializa userId como null
  setAccessToken: () => {},
  setUserId: () => {}, // Inicializa setUserId como una función vacía
});

export const AuthProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // Añade estado para userId

  useEffect(() => {
    const storedToken = Cookies.get('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }

    const storedUserId = Cookies.get('userId'); // Obtener userId de la cookie
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, userId, setAccessToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
