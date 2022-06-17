import React from 'react';
import { Link } from 'react-router-dom';
import tw from "tailwind-styled-components"

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

const Navbar = tw.div`
flex flex-row justify-end gap-10 bg-slate-100 pt-2 pb-2 pr-4 mb-4
`