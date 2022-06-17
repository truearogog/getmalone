import React from 'react';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

export function SellerProfile() {
	return (
		<div>
			<MyForm />
			Seller
		</div>
	);
}

const MyForm = styled.div`
  background-color: red;
	height: 100px;
	width: 20px;
`;