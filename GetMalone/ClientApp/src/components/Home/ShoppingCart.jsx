import React from 'react';
import styled from 'styled-components'

import { ProductList } from '../ProfilePage/ProductList';
import { FormButton } from '../Form/FormTemplate'

export function ShoppingCart({ handleProductChange, chosenProducts, handlePageChange }) {
	function handleOrderConfirm() {
		handleProductChange('reset')
		handlePageChange('HomePage')

		alert("Order confirmed!");
	}
	
	function getTotalCost() {
		let cost = 0
		
		chosenProducts.forEach(product => {
			cost += product.priceEuro
		})
		
		return cost	
	}
	
	return (
		<div style={{ padding: '16px', marginTop: '48px' }}>
			<Button onClick={() => handlePageChange('HomePage')}>Get me HOME!!!!</Button>
			<h2>SHOPPING CARTTTTTTTTTTT</h2>
			{<ProductList handleProductChange={name => handleProductChange(name)} products={chosenProducts} />}
			{<p>Total cost: {getTotalCost()}€</p>}
			<FormButton onClick={handleOrderConfirm}>Confirm order</FormButton>
		</div>
	);
}

const Button = styled.div`
  border-radius: 5px;
	border: solid;
  padding: 4px;
  cursor: pointer;
`