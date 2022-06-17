import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { About } from './components/About';

import './custom.css'

export default function App() {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/profile' component={Profile} />
      <Route path='/about' component={About} />
    </Layout>
  );
}
