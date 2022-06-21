import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../services/UserContext';
import { variables } from '../services/variables';

export function NavMenu({ handlePageChange }) {
  const { user, setUser } = useContext(UserContext);

  async function handleLogout() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const response = await fetch(variables.API_URL + 'auth/logout', requestOptions)
      if (!response.ok) throw new Error(response.statusText)

      setUser(null)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
      <Navbar>
        <div onClick={() => { handlePageChange('MainPage') }}>
          <Link tag={Link} style={{ textDecoration: 'none' }} to="/">Home</Link>
          <Link tag={Link} style={{ textDecoration: 'none' }} to="/profile">Profile</Link>
          <Link tag={Link} style={{ textDecoration: 'none' }} to="/about">About</Link>
        </div>
        <div style={{width: '10%'}}>
          {user != false ? user == null ?
            <div>
              <Button onClick={() => { handlePageChange('LoginPage') }}>Login</Button>
              /Register
            </div>
            : <div>
              <Button onClick={handleLogout}>Logout</Button>
            </div> : null
          }
        </div>
      </Navbar>
    </header>
  );
}

const Navbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  background-color: rgb(241 245 249 / 100);
  margin-bottom: 1rem;
  
  & > * > *{
    margin-right: 2rem;
  }
`

const Button = styled.div`
  border: 1px;
  border: solid;
  width: 100px;
  height: 20px;
  line-height: 20px;
  padding: 1px;
  margin: auto;
  text-align: center;
  
  &:hover{
    cursor: pointer;
  }
  
  & > * {
    margin: auto;
  }
`