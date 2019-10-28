import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Message } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    message: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories)
      this.setState({
        repositories: JSON.parse(repositories),
      });
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true,
      error: false,
    });

    const { newRepo, repositories } = this.state;

    try {
      const checkRepoExists = repositories.find(r => r.name === newRepo);

      if (checkRepoExists) throw new Error('Duplicated Repository');

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
      });
    } catch (error) {
      this.setState({
        error: true,
        message: error.message,
      });
    } finally {
      this.setState({
        newRepo: '',
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, error, message } = this.state;

    const repos = repositories.map(repository => (
      <li key={repository.name}>
        <span>{repository.name}</span>
        <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
          Details
        </Link>
      </li>
    ));

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={({ target }) => this.setState({ newRepo: target.value })}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <Message>{error && <p>{message}</p>}</Message>
        <List>{repos}</List>
      </Container>
    );
  }
}
