import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function NavMenu() {
  return (
    <header>
      <Navbar>
        <Link tag={Link} style={{ textDecoration: 'none' }} to="/">Home</Link>
        <Link tag={Link} style={{ textDecoration: 'none' }} to="/profile">Profile</Link>
        <Link tag={Link} style={{ textDecoration: 'none' }} to="/about">About</Link>
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
  
  & > *{
    margin-right: 2rem;
  }
`