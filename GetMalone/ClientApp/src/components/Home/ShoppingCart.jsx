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
		<Container>
			{<ProductList handleProductChange={name => handleProductChange(name)} products={chosenProducts} title={"Your Shopping Cart"}/>}
			{<p>Total cost: {getTotalCost()}€</p>}
			<FormButton onClick={handleOrderConfirm}>Confirm order</FormButton>
			<br/>
			<FormButton onClick={() => handlePageChange('HomePage')}>Cancel</FormButton>
		</Container>
	);
}

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 0 100px 50px 100px;
  background: #f3f3f3;
  text-align: center;
`