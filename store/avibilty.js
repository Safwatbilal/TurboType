'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import checkAuth from '@/app/actions/checkAuth';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [profile, setProfile] = useState({})
    useEffect(() => {
        const checkAuthentication = async () => {
            const { isAuthenticated, user } = await checkAuth();
            setIsAuthenticated(isAuthenticated);
            setCurrentUser(user);
            setProfile(user)
        };

        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                currentUser,
                setCurrentUser,
                profile
            }}
        >
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
