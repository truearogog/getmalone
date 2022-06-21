import React, { useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { About } from './Pages/About';

import './custom.css'
import { UserContext } from './services/UserContext';

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
