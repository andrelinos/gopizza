import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
    color: theme.COLORS.GRADIENT
}))`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const Title = styled.Text`
    font-size: 14px;

    ${({ theme }) => css`
        font-family: ${({ theme }) => theme.COLORS.TEXT};
    `}
`;
