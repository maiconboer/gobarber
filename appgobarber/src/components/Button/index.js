import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

const Button = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>
      {children}
      </ButtonText>
    </Container>
  )
}

export default Button;
