/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {
  Container,
  Header,
  Body,
  Content,
  Form,
  Button,
  Spinner,
  Text,
  Item,
  Icon,
  Input,
  Title,
} from 'native-base';

import RepoList from './repoList';

export default class App extends Component<{}> {

  state = {
    search: '',
    repositories: [],
    loading: false,
  }

  fetchRepositories = async () => {
    if (this.state.search.length > 0) {
       this.setState({ loading: true });
       const response = await fetch(`https://api.github.com/search/repositories?q=${this.state.search}`);
       const repositories = await response.json();

       this.setState({
         repositories: repositories.items,
         loading: false,
       });
    }
  };

  render() {
    return (
        <Container>
          <Header>
            <Body>
              <Title>Get Code</Title>
            </Body>
          </Header>
          <Content padder>
            <Form>
              <Item last>
                <Icon active name='search' />
                <Input placeholder="react-native, android, javascript..."
                   value={this.state.search}
                   onChangeText={text => this.setState({ search: text })}/>
               </Item>
            </Form>
            <Button block style={{ marginTop: 10 }} onPress={this.fetchRepositories}>
              <Text>Buscar</Text>
            </Button>
            {
              this.state.loading ? <Spinner color="#999" /> : <RepoList repositories={this.state.repositories} />
            }
          </Content>
        </Container>
    );
  }
}
