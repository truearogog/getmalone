import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export function Layout(component) {
  return (
    <div>
      <NavMenu />
      <Container className='p-6'>
        {
          component.children
        }
      </Container>
    </div>
  );
}
