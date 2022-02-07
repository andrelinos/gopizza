import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Input } from '@src/components/Input';
import { Button } from '@src/components/Button';

import { Container, Content } from './styles';

export function SignIn() {
    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Content>
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

                    <Button title="Entrar" />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}
