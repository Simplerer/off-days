import './App.css';
import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import MobileNav from './components/MobileNav';
import LoginTabs from './components/UserTabs';
import Particle from './components/Particles';
import pages from './pages';
const { Outdoors, WrongPage, Landing, Indoors, Events, Brews, Logout, Forum, Likes } = pages

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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
  const [mobile, setMobile] = useState(true)
  const listening = () => {
    if (window.innerWidth <= 480) {
      setMobile(false)
    }
    if (window.innerWidth > 480) {
      setMobile(true)
    }

  }
  window.addEventListener('resize', listening)

  const [background, setBackground] = useState(false);
  const chillPlz = () => setBackground(!background);

  return (
    <>
      {background &&
        <Particle />
      }
      <ApolloProvider client={client}>
        {background 
        ?
        <button id='chillPlz' onClick={chillPlz}>
          Chill<br></br>Time
        </button>
        :
        <button id='chillPlz' onClick={chillPlz}>
          Wild<br></br>Time
        </button>
        }
        <Router>
          {mobile
            ?
            <Navbar background={background}>
              <div>
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
                    path='/forum'
                    element={<Forum />}
                  />
                  <Route
                    path='/likes'
                    element={<Likes />}
                  />
                  <Route
                    path='/login'
                    element={<LoginTabs />}
                  />
                  <Route
                    path='/logout'
                    element={<Logout />}
                  />
                  <Route
                    path='*'
                    element={<WrongPage />}
                  />
                </Routes>
              </div>
            </ Navbar>
            :
            <div>
              <MobileNav />
              <main>
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
                    path='/forum'
                    element={<Forum />}
                  />
                  <Route
                    path='*'
                    element={<WrongPage />}
                  />
                </Routes>
              </main>
            </div>
          }
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
