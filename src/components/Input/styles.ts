import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type InpuProps = {
    type: TypeProps;
};

export const Container = styled(TextInput).attrs<InpuProps>(
    ({ theme, type }) => ({
        placeHolderTextColor:
            type === 'primary'
                ? theme.COLORS.SECONDARY_900
                : theme.COLORS.PRIMARY_50
    })
)``;

export const Title = styled.Text``;
