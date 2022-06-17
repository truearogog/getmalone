import React from 'react';
import UserProfile from './UserProfile';
import { SellerProfile } from './SellerProfile';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

function GetUserRole() {
  //const userRole = localStorage.getItem('userRole');
  const userRole = 'seller';

  if (userRole === 'user') {
	return <UserProfile />;
  } else if (userRole === 'seller') {
	return <SellerProfile />;
  }
}

export function Profile() {
	return (
	  <>
		<div>
			<MyForm />
		</div>
		<GetUserRole />
	  </>
	);
}

const MyForm = styled.div`
  background-color: grey;
	height: 100px;
	width: 20px;
`;