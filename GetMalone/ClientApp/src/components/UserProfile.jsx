import React from 'react';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

export default function UserProfile() {
	return (
		<div>
			<MyForm />
			User
		</div>
	);
}

const MyForm = styled.div`
  background-color: blue;
	height: 100px;
	width: 20px;
`;