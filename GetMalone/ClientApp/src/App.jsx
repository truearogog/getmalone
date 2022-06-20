import React, { useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { About } from './components/About';

import './custom.css'
import { UserContext } from './UserContext';

export default function App() {
  const [value, setValue] = useState(false)

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/about' component={About} />
      </Layout>
    </UserContext.Provider>
  );
}
