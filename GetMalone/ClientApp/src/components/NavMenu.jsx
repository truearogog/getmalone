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

      alert("User logged out");
    }
    catch (err) {
      console.log(err)
    }
  }

  function userButton() {
    if (user === false || !user)
      return null

    if (user.role === 'buyer')
      return <Button onClick={() => handlePageChange('ShoppingCartPage')}><p>Shopping cart</p></Button>
    else
      return <Button onClick={() => handlePageChange('AddProductPage')}><p>Add product</p></Button>

  }

  return (
    <header>
      <Navbar>
        <div className="links">
          <Link onClick={() => { handlePageChange('MainPage') }} tag={Link} style={{ textDecoration: 'none' }} to="/">Home</Link>
          <Link onClick={() => { handlePageChange('MainPage') }} tag={Link} style={{ textDecoration: 'none' }} to="/profile">Profile</Link>
          <Link onClick={() => { handlePageChange('MainPage') }} tag={Link} style={{ textDecoration: 'none' }} to="/about">About</Link>
          {userButton()}
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
  }

  .links {
    padding-left: 80px;

    div {
      width: 200px;
      height: auto;
    }
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