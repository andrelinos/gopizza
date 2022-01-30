import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TypeProps } from './styles';

type Props = TextInputProps & {
    type?: TypeProps;
};

export function SignIn() {
    return (
        <Container>
            <Title>SignIn</Title>
        </Container>
    );
}
