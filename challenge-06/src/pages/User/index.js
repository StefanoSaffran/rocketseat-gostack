import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: true,
    loadingMore: false,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.load();
  }

  load = async () => {
    const { stars, page } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      refreshing: false,
      loadingMore: false,
    });
  };

  loadMore = async () => {
    const { page } = this.state;

    await this.setState({ page: page + 1, loadingMore: true }, () =>
      this.load()
    );
  };

  refreshList = async () => {
    await this.setState(
      {
        page: 1,
        stars: [],
        refreshing: true,
        loading: true,
      },
      () => this.load()
    );
  };

  handleNavigate = repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, refreshing, loadingMore } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7159c1" size={30} />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar
                  source={{ uri: item.owner && item.owner.avatar_url }}
                />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner && item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
            onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
            onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={this.loadMore}
          />
        )}
        {loadingMore && <ActivityIndicator color="#7159c1" size={30} />}
      </Container>
    );
  }
}
