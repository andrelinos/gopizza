import React from 'react';

import { Input } from '@src/components/Input';
import { Button } from '@src/components/Button';

import { Container } from './styles';

export function SignIn() {
    return (
        <Container>
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
        </Container>
    );
}
