import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type InputProps = {
    type: TypeProps;
};

export const Container = styled(TextInput).attrs<InputProps>(
    ({ theme, type }) => ({
        placeHolderTextColor:
            type === 'primary'
                ? theme.COLORS.SECONDARY_900
                : theme.COLORS.PRIMARY_50
    })
)<InputProps>`
    width: 100%;
    height: 56px;
    background-color: transparent;
    border-radius: 12px;
    font-size: ${RFValue(14)}px;
    padding: 7px 0 7px 20px;
    margin-bottom: 16px;

    ${({ theme, type }) => css`
        font-family: ${theme.FONTS.TEXT};
        border: 1px ${theme.COLORS.SHAPE};
        color: ${type === 'primary'
            ? theme.COLORS.SECONDARY_900
            : theme.COLORS.TITLE};
    `}
`;

export const Title = styled.Text``;
