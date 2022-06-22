import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { About } from './Pages/About';

import './custom.css'
import { UserContext } from './services/UserContext';
import { variables } from './services/variables';

export default function App() {
  const [user, setUser] = useState(false)

  async function checkAunthentication() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    
    try {
      const response = await fetch(variables.API_URL + 'auth/user')
      if (!response.ok) throw new Error(response.statusText, requestOptions)
      
      const data = await response.json();
      if(data.success == false) throw new Error(data.error, requestOptions)
      
      
      setUser(data.data)
    }
    catch (err) {
      setUser(null);
      console.log(err)
    }
  }

  useEffect(() => {
    checkAunthentication()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/about' component={About} />
      </Layout>
    </UserContext.Provider>
  );
}
