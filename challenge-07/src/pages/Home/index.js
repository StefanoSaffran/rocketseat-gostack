import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import {
  Container,
  Product,
  Image,
  Title,
  Price,
  ProductAmount,
  ProductAmountText,
  AddCartButton,
  AddCartButtonText,
} from './styles';

class Home extends Component {
  state = {
    products: [],
    loading: false,
  };

  async componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    this.setState({ loading: true });

    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({
      products: data,
      loading: false,
    });
  };

  handleAddProduct = id => {
    const { addToCartRequest, navigation } = this.props;

    addToCartRequest(id);
    navigation.navigate('Card');
  };

  render() {
    const { products, loading } = this.state;
    const { amount } = this.props;

    return (
      <Container>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={product => product.id}
          renderItem={({ item }) => (
            <Product>
              <Image source={{ uri: item.image }} />
              <Title>{item.title}</Title>
              <Price>{item.priceFormatted}</Price>

              <AddCartButton onPress={() => this.handleAddProduct(item.id)}>
                <ProductAmount>
                  <Icon name="add-shopping-cart" size={20} color="#fff" />
                  <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
                </ProductAmount>
                <AddCartButtonText>Add to Cart</AddCartButtonText>
              </AddCartButton>
            </Product>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

Home.propTypes = {
  amount: PropTypes.number,
  addToCartRequest: PropTypes.func,
}.isRequired;
