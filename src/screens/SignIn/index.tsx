import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import brandImg from '@assets/brand.png';

import { Input } from '@src/components/Input';
import { Button } from '@src/components/Button';

import {
    Container,
    Content,
    Title,
    Brand,
    ForgotPasswordButton,
    ForgotPasswordLabel
} from './styles';

export function SignIn() {
    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Content>
                    <Brand source={brandImg} />

                    <Title>Login</Title>
                    <Input
                        placeholder="E-mail"
                        type="secondary"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        placeholder="Senha"
                        type="secondary"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>
                            Esqueci minha senha
                        </ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button title="Entrar" />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}
