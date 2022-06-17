import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export function Layout(component) {
  return (
    <div>
      <NavMenu />
      <Container style={{ padding: '16px' }}>
        {
          component.children
        }
      </Container>
    </div>
  );
}
