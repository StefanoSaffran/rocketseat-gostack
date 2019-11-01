import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const Cart = () => {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (sumTotal, product) => sumTotal + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  const increment = product => {
    dispatch(CartAction.updateAmountRequest(product.id, product.amount + 1));
  };

  const decrement = product => {
    dispatch(CartAction.updateAmountRequest(product.id, product.amount - 1));
  };

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
                  <ProductDelete
                    onPress={() =>
                      dispatch(CartAction.removeFromCart(product.id))
                    }
                  >
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
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
};

export default Cart;

Cart.propTypes = {
  cart: PropTypes.object,
  total: PropTypes.number,
  removeFromCart: PropTypes.func,
  updateAmountRequest: PropTypes.func,
}.isRequired;
