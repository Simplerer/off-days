import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import pages from './pages';
const { Outdoors, WrongPage, Landing } = pages

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
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
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
                path='*'
                element={<WrongPage />}
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
