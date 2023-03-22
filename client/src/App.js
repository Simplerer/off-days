import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import pages from './pages';
import Particle from './components/Particles';
import React from 'react';
const { Outdoors, WrongPage, Landing, Indoors, Events, Brews } = pages

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


function App() {
  return (
    <>
    <Particle/>
      <ApolloProvider client={client}>
        <Router>
          <Navbar>
            <div className='content'>
              <Routes>
                <Route
                  path='/'
                  element={<Landing />}
                />
                <Route
                  path='/outdoors'
                  element={<Outdoors />}
                />
                <Route
                  path='/indoors'
                  element={<Indoors />}
                />
                <Route
                  path='/events'
                  element={<Events />}
                />
                <Route
                  path='/brews'
                  element={<Brews />}
                />
                <Route
                  path='*'
                  element={<WrongPage />}
                />
              </Routes>
            </div>
          </ Navbar>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
