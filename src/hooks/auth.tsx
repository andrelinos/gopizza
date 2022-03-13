import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
};

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
    const [user, setUser] = useState<User | null>(null);

    async function signIn(email: string, password: string) {
        try {
            if (!email || !password) {
                return Alert.alert('Login', 'Informe o e-mail e a senha');
            }

            setIsLogging(true);

            auth()
                .signInWithEmailAndPassword(email, password)
                .then((account: any) => {
                    firestore()
                        .collection('users')
                        .doc(account.user.uid)
                        .get()
                        .then((profile) => {
                            const { name, isAdmin } = profile.data() as User;

                            if (profile.exists) {
                                const userData = {
                                    id: account.user.uid,
                                    name,
                                    isAdmin
                                };
                                setUser(userData);
                            }
                        });
                })
                .catch((error: { code: any }) => {
                    const { code } = error;

                    console.log('ERROR: => ', error);

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
                            'Ocorreu algum erro durante o login!'
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
