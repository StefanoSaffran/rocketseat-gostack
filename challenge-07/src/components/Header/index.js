import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Wrapper, Container, BasketContainer, ItemCount } from './styles';

const Header = ({ navigation, cartSize }) => {
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

const mapStateToProps = state => ({
  cartSize: state.cart.length,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  cartSize: PropTypes.number,
}.isRequired;
