import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../services/Contexts';
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

      alert("User logged out");
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <header>
      <Navbar>
        <div className="links" onClick={() => { handlePageChange('MainPage') }}>
          <Link tag={Link} style={{ textDecoration: 'none' }} to="/">Home</Link>
          <Link tag={Link} style={{ textDecoration: 'none' }} to="/profile">Profile</Link>
          <Link tag={Link} style={{ textDecoration: 'none' }} to="/about">About</Link>
        </div>
        <div>
          {user != false ?
            user == null ?
              <>
                <Button onClick={() => { handlePageChange('LoginPage') }}>Login</Button>
                <Button onClick={() => { handlePageChange('RegisterPage') }}>Register</Button>
              </>
              : <Button onClick={handleLogout}>Logout</Button>
            : null
          }
        </div>
      </Navbar>
    </header>
  );
}

const Navbar = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  background-color: rgb(241 245 249 / 100);
  
  & > * > *{
    display: inline-block;
    width: 50px;
    margin-left: 2rem;

    &:first-child {
      padding-left: 100px;
    }
    
    @media (max-width: 700px) {
      &:first-child {
        padding-left: 20px;
      }
    }
  }

  .links {
    padding-left: 80px;
  }

  a {
    color: rgba(0,0,0);
    opacity: .5;
    transition: opacity .3s;
  }

  a:hover {
    opacity: .8;
  }
`

const Button = styled.div`
  width: 100px;
  height: 30px;
  margin: auto;
  text-align: center;
  opacity: .7;
  transition: opacity .5s;

  &:not(&:last-child) {
    border-right: 1px solid #aaa;
  }
  
  &:hover{
    opacity: 1;
    cursor: pointer;
    font-weight: 600;
  }
`