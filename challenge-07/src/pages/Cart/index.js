import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { formatPrice } from '../../util/format';

import * as CartAction from '../../store/modules/cart/actions';

import {
  Container,
  CartList,
  Product,
  ProductInfo,
  Image,
  Details,
  Title,
  Price,
  ProductDelete,
  ProductControls,
  AmountButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

const Cart = ({ cart, total, removeFromCart, updateAmountRequest }) => {
  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  return (
    <Container>
      {cart.length ? (
        <>
          <CartList>
            {cart.map(product => (
              <Product key={product.id}>
                <ProductInfo>
                  <Image source={{ uri: product.image }} />
                  <Details>
                    <Title>{product.title}</Title>
                    <Price>{product.priceFormatted}</Price>
                  </Details>
                  <ProductDelete onPress={() => removeFromCart(product.id)}>
                    <Icon name="delete-forever" size={24} color="#141419" />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <AmountButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color="#7159c1"
                    />
                  </AmountButton>
                  <ProductAmount value={String(product.amount)} />
                  <AmountButton onPress={() => increment(product)}>
                    <Icon name="add-circle-outline" size={20} color="#7159c1" />
                  </AmountButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </CartList>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>Checkout</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Your Shopping Cart is empty.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch => bindActionCreators(CartAction, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

Cart.propTypes = {
  cart: PropTypes.object,
  total: PropTypes.number,
  removeFromCart: PropTypes.func,
  updateAmountRequest: PropTypes.func,
}.isRequired;
