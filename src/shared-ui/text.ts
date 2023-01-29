import { Text } from 'react-native';
import styled from '../styled';

export const BodyText = styled(Text)`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
