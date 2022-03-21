import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
// import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
};

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
};

type AuthProviderProps = {
    children: ReactNode;
};

const USER_COLLECTION = '@gopizza:users';

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
                        .then(async (profile) => {
                            const { name, isAdmin } = profile.data() as User;

                            if (profile.exists) {
                                const userData = {
                                    id: account.user.uid,
                                    name,
                                    isAdmin
                                };

                                await AsyncStorage.setItem(
                                    USER_COLLECTION,
                                    JSON.stringify(userData)
                                );
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
            setIsLogging(false);
            return Alert.alert('Login', 'Ocorreu no processo de signIn');
        }
    }

    useEffect(() => {
        async function loadUserStorageData() {
            try {
                const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

                if (storedUser) {
                    const userData = JSON.parse(storedUser) as User;
                    console.log(userData);
                    setUser(userData);
                }
            } catch (error) {
                Alert.alert('Erro', 'Erro ao carregar informações do usuário');
            } finally {
                setIsLogging(false);
            }
        }

        loadUserStorageData();
    }, []);

    async function signOut() {
        try {
            await auth().signOut();
            await AsyncStorage.removeItem(USER_COLLECTION);
            setUser(null);
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao sair da aplicação');
        }
    }

    async function forgotPassword(email: string) {
        if (!email) {
            return Alert.alert(
                'Redefinir senha',
                'Informe o e-mail para continuar'
            );
        }

        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert(
                    'Redefinir senha',
                    'Enviamos um e-mail com informações para redefinir sua senha'
                );
            })
            .catch(() => {
                Alert.alert(
                    'Redefinir senha',
                    'Ocorreu um erro ao enviar o e-mail para redefinir sua senha'
                );
            });
    }

    return (
        <AuthContext.Provider
            value={{ user, signIn, signOut, forgotPassword, isLogging }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
