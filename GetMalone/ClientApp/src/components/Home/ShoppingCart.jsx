import React from 'react';
import styled from 'styled-components'

export function ShoppingCart({ handlePageChange }) {
	return (
		<div style={{ padding: '16px', marginTop: '48px' }}>
			<Button onClick={() => handlePageChange('HomePage')}>Get me HOME!!!!</Button>
			<h2>SHOPPING CARTTTTTTTTTTT</h2>
		</div>
	);
}

const Button = styled.div`
  border-radius: 5px;
	border: solid;
  padding: 4px;
  cursor: pointer;
`