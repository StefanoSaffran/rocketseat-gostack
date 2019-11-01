import React, { Component } from 'react';
import {
  FaGithubAlt,
  FaPlus,
  FaSpinner,
  FaRegEye,
  FaRegTrashAlt,
} from 'react-icons/fa';
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

      if (newRepo === '') throw new Error('Repository name required');

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

  handleDelete = name => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter(repo => repo.name !== name),
    });
  };

  render() {
    const { newRepo, repositories, loading, error, message } = this.state;

    const repos = repositories.map(repository => (
      <li key={repository.name}>
        <span>{repository.name}</span>
        <div>
          <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
            <FaRegEye size={16} />
          </Link>
          <button
            type="button"
            onClick={() => this.handleDelete(repository.name)}
          >
            <FaRegTrashAlt size={16} />
          </button>
        </div>
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
