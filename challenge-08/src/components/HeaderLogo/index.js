import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, TouchableLogo, Logo } from './styles';

const HeaderLogo = ({ navigation }) => {
  return (
    <Wrapper>
      <Container>
        <TouchableLogo onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableLogo>
      </Container>
    </Wrapper>
  );
};

export default HeaderLogo;

HeaderLogo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
