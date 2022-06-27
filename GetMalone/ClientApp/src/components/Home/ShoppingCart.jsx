import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'

import { ProductList } from '../ProfilePage/ProductList';
import { Container, FormButton } from '../Form/FormTemplate'

export function ShoppingCart({ handleProductChange, chosenProducts, handlePageChange }) {
	const [productsFiltered, setProductsFiltered] = useState(chosenProducts)

	const searchText = useRef('');

	function handleOrderConfirm() {
		handleProductChange('reset')
		handlePageChange('MainPage')

		alert("Order confirmed!");
	}

	function getTotalCost() {
		let cost = 0

		chosenProducts.forEach(product => {
			cost += product.priceEuro
		})

		return (Math.round((cost + Number.EPSILON) * 100) / 100).toFixed(2);
	}

	useEffect(() => {
		setProductsFiltered(chosenProducts)
		handleSearchClick(searchText.current)
	}, [chosenProducts])

	function handleSearchClick(name) {
		searchText.current = name
		setProductsFiltered(chosenProducts.filter((product) => product.name.toLowerCase().includes(name.toLowerCase())))
	}

	return (
		<Container>
			{<ProductList handleSearchClick={name => handleSearchClick(name)} handleProductChange={name => handleProductChange(name)} products={productsFiltered} title={"Your Shopping Cart"} />}
			{<p>Total cost: {getTotalCost()}€</p>}
			<FormButton onClick={handleOrderConfirm}>Confirm order</FormButton>
			<br />
			<FormButton onClick={() => handlePageChange('MainPage')}>Cancel</FormButton>
		</Container>
	);
}