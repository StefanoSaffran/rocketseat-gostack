import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Wrapper, Container, BasketContainer, ItemCount } from './styles';

const Header = ({ navigation }) => {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Wrapper>
      <Container>
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
};

export default Header;

Header.propTypes = {
  cartSize: PropTypes.number,
}.isRequired;
