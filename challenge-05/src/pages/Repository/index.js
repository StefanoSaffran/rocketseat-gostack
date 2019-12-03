import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import parse from 'parse-link-header';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  SelectIssueState,
  PaginationButtons,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: 'all',
    page: 1,
    lastPage: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { issueState, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issueState,
          page,
          per_page: 10,
        },
      }),
    ]);
    const { last } = parse(issues.headers.link);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      lastPage: Number(last.page),
    });
  }

  handleChange = ({ target }) => {
    this.setState({ issueState: target.value });
  };

  handleClick = async () => {
    const { match } = this.props;
    const { issueState, page } = this.state;

    this.setState({
      loading: true,
    });

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState,
        page,
        per_page: 10,
      },
    });
    const { last } = parse(issues.headers.link);

    this.setState({
      issues: issues.data,
      loading: false,
      lastPage: Number(last.page),
    });
  };

  handlePrevious = async () => {
    const { match } = this.props;
    const { issueState, page } = this.state;

    this.setState({
      loading: true,
      page: page - 1,
    });

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState,
        page,
        per_page: 10,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  handleNext = async () => {
    const { match } = this.props;
    const { issueState, page } = this.state;

    this.setState({
      loading: true,
    });

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issueState,
        page: page + 1,
        per_page: 10,
      },
    });

    this.setState({
      issues: issues.data,
      page: page + 1,
      loading: false,
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      issueState,
      page,
      lastPage,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#fff" size={30} />
        </Loading>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <SelectIssueState htmlFor="select">
          ISSUES STATE:
          <select id="select" value={issueState} onChange={this.handleChange}>
            <option value="all">ALL</option>
            <option value="open">OPEN</option>
            <option value="closed">CLOSED</option>
          </select>
          <button type="button" onClick={this.handleClick}>
            Select
          </button>
        </SelectIssueState>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PaginationButtons page={page}>
          <button
            disabled={page === 1}
            type="button"
            onClick={this.handlePrevious}
          >
            Previous
          </button>
          <button
            disabled={page === lastPage}
            type="button"
            onClick={this.handleNext}
          >
            Next
          </button>
        </PaginationButtons>
      </Container>
    );
  }
}
