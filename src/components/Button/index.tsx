import React from 'react';
// import { RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler';

import { Container, Title, Load, TypeProps } from './styles';

type ButtonProps = {
    title: string;
    type?: TypeProps;
    isLoading?: boolean;
    onPress?: () => void;
    enabled?: boolean;
};

export function Button({
    title,
    type = 'primary',
    isLoading = false,
    onPress,
    ...rest
}: ButtonProps) {
    return (
        <Container type={type} enabled={!isLoading} onPress={onPress} {...rest}>
            {isLoading ? <Load /> : <Title>{title}</Title>}
        </Container>
    );
}
