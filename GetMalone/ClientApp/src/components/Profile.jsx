import React from 'react';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

export function Profile() {
	return (
		<div>
			<MyForm />
			Form
		</div>
	);
}

const MyForm = styled.div`
  background-color: grey;
	height: 100px;
	width: 20px;
`;