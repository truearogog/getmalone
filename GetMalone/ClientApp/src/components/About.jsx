import React from 'react';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

export function About() {
	return (
		<Container>

			<Title>About</Title>

      <Contacts />

		</Container>	
	);
}
const Container = styled.div`
  width: 50%;
	margin: 0 auto;
`;
const Title = styled.div`
  padding-top: 30px;
  padding-bottom: 20px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
`;

function Contacts() {
	return (
		<ContactsWrapper>
			<p>This website was made as a project for <a href="https://www.lu.lv/" Title="our uni">University of Latvia</a>, all products and orders are not real and all users and sellers are purely fictional. Thank you for visiting us!</p>
      <p>If you still have any questions, feel free to contact: </p>
      <ul>
        <li>Github: <a href="https://github.com/sakuraaah">github.com/sakuraaah</a></li>
        <li>Github: <a href="https://github.com/C-Coretex">github.com/C-Coretex</a></li>
        <li>Github: <a href="https://github.com/truearogog">github.com/truearogog</a></li>
      </ul>
      <Repository />
		</ContactsWrapper>	
	);
}

function Repository() {
  return (
    <RepositoryWrapper>
      <p>Our Repository in GitHub:</p>
      <a href="https://github.com/truearogog/getmalone" Title="Github">github.com/GetMalone</a>
    </RepositoryWrapper>
  )
}
const ContactsWrapper = styled.div`
  font-size: 20px;
  p a {
    width: 167px;
    display: inline-block;
    text-align: center;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    transition: color .3s;
    &:hover {
      color: #8565c4;
      font-weight: 600;
    }
  }
`;
const RepositoryWrapper = styled.div`
  padding-top: 1px;
  line-height: 15px;
  a {
    padding-left: 40px;
  }
`;