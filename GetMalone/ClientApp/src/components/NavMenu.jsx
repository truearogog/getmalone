import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function NavMenu() {
  return (
    <header>
      <Navbar>
        <Link tag={Link} className="text-dark text-2xl hover:text-cyan-900" to="/">Home</Link>
        <Link tag={Link} className="text-dark text-2xl hover:text-cyan-900" to="/profile">Profile</Link>
        <Link tag={Link} className="text-dark text-2xl hover:text-cyan-900" to="/about">About</Link>
      </Navbar>
    </header>
  );
}

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  background-color: rgb(241 245 249 / 100);
  margin-bottom: 1rem;
`