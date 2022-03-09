import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [isLogging, setIsLogging] = useState(false);

    async function signIn(email: string, password: string) {
        try {
            if (!email || !password) {
                return Alert.alert('Login', 'Informe o e-mail e a senha');
            }

            setIsLogging(true);

            auth()
                .signInWithEmailAndPassword(email, password)
                .then((account: any) => {
                    console.log(account);
                })
                .catch((error: { code: any }) => {
                    const { code } = error;

                    if (
                        code === 'auth/user-not-found' ||
                        code === 'auth/wrong-password'
                    ) {
                        return Alert.alert(
                            'Login',
                            'E-mail e/ou senha inválida'
                        );
                    } else {
                        return Alert.alert(
                            'Login',
                            'Ocorreu algum erro durante o login'
                        );
                    }
                })
                .finally(() => {
                    setIsLogging(false);
                });
        } catch (error) {
            console.log('ERRO ENCONTRADO:', error);
            setIsLogging(false);
            return Alert.alert('Login', 'Ocorreu no processo de signIn');
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isLogging }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
