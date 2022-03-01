import React, { createContext, useContext, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

type AuthContextData = {};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe o e-mail e a senha');
        }
    }

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
