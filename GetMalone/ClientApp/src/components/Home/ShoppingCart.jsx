import React from 'react';
import styled from 'styled-components'

import { ProductList } from '../ProfilePage/ProductList';
import { Container, FormButton } from '../Form/FormTemplate'

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
		<Container>
			{<ProductList handleProductChange={name => handleProductChange(name)} products={chosenProducts} title={"Your Shopping Cart"}/>}
			{<p>Total cost: {getTotalCost()}€</p>}
			<FormButton onClick={handleOrderConfirm}>Confirm order</FormButton>
			<br/>
			<FormButton onClick={() => handlePageChange('HomePage')}>Cancel</FormButton>
		</Container>
	);
}