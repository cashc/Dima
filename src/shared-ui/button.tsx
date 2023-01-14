import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from '../styled';

interface Props extends TouchableOpacityProps {
  type?: 'border' | 'fill' | 'transparent';
  size?: 'default' | 'small';
  width?: number;
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
  label?: string;
}

const Layout = styled.TouchableOpacity.attrs(({ theme }) => ({
  activeOpacity: theme.buttonActiveOpacity,
}))<Props>`
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: ${({ size, theme }) =>
    size === 'default' ? theme.buttonHeight : theme.buttonHeightSmall}px;
  border-radius: ${({ theme }) => theme.buttonHeight}px;
  border-width: ${({ type }) => (type === 'border' ? 1.25 : 0)}px;
  border-color: ${({ type, theme }) =>
    type === 'transparent' ? 'transparent' : theme.black};
  opacity: ${({ disabled }) => (disabled ? 0.25 : 1)};
  ${({ width }) => (width ? `width: ${width}px;` : '')}
`;

export const ButtonLabel = styled.Text<Partial<Props>>`
  align-self: center;
  font-weight: bold;
  font-size: ${({ size }) => (size === 'small' ? 13 : 15)}px;
  text-align: center;
  color: ${({ type, theme }) => (type === 'fill' ? theme.white : theme.black)};
`;

export const Button: React.FC<Props> = ({ onPress, label, ...layoutProps }) => {
  const { size, type } = layoutProps;

  return (
    <Layout
      {...layoutProps}
      onPress={layoutProps.disabled ? undefined : onPress}>
      {label ? (
        <ButtonLabel size={size} type={type}>
          {label}
        </ButtonLabel>
      ) : (
        layoutProps.children
      )}
    </Layout>
  );
};

Button.defaultProps = {
  type: 'border',
  size: 'default',
};
