import React, { useState, useEffect, useRef } from 'react';
import { FormDropDown } from '../Form/FormTemplate'
import { v4 as uuidv4 } from 'uuid';
import { variables } from '../../services/variables';

import { ProductList } from '../ProfilePage/ProductList';
import { Container, FormButton } from '../Form/FormTemplate'

export function ShoppingCart({ getId, handleProductChange, chosenProducts, handlePageChange }) {
	const [productsFiltered, setProductsFiltered] = useState(chosenProducts)
	
	const [deliveries, setDeliveries] = useState([])
	const [currentDelivery, setCurrentDelivery] = useState([])
	const [error, setError] = useState('')
	
	const searchText = useRef('');

	async function handleOrderConfirm(e) {
		e.preventDefault()
		
		const chosenProductsIds = chosenProducts.map(order => order.id)
		const formData = { productIds: chosenProductsIds, deliveryOptionId: currentDelivery.id }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			let response = await fetch(variables.API_URL + 'order/create', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			let data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)
			
			console.log(data.data)


			handleProductChange('reset')
			handlePageChange('MainPage')
	
			alert("Order confirmed!");
		}
		catch (err) {
			console.log(err)
			setError('' + err)
		}
	}

	function getTotalCost() {
		let cost = 0
		
		chosenProducts.forEach(product => {
			cost += product.priceEuro
		})
		
		cost += currentDelivery.priceEuro
		
		return (Math.round((cost + Number.EPSILON) * 100) / 100).toFixed(2);
	}

	useEffect(() => {
		setProductsFiltered(chosenProducts)
		handleSearchClick(searchText.current)
	}, [chosenProducts])
	
	async function getDeliveries() {
		try {
			const response = await fetch(variables.API_URL + 'delivery/alloptions');
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error)

			setDeliveries(data.data);

			setCurrentDelivery(data.data[0]);
		}
		catch (err) {
			console.log(err)
			setError(err)
		}
	}
	
	useEffect(() => {
		getDeliveries()
	}, [])
	
	function handleSearchClick(name) {
		searchText.current = name
		setProductsFiltered(chosenProducts.filter((product) => product.name.toLowerCase().includes(name.toLowerCase())))
	}

	return (
		<Container>
			{<ProductList isCart={true} getId={id => getId(id)}  handlePageChange={name => handlePageChange(name)} handleSearchClick={name => handleSearchClick(name)} handleProductChange={name => handleProductChange(name)} chosenProducts={chosenProducts} products={productsFiltered} title={"Your Shopping Cart"} />}
			{ (chosenProducts.length != 0) ?
			<>
				Delivery type:
				<FormDropDown onChange={(e) => setCurrentDelivery(deliveries[e.target.value - 1])} value={currentDelivery.id} name="categories">
					{deliveries.map(item => {
						return <option key={uuidv4()} value={item.id}>Delivety type - {item.deliveryType.name}, delivery company - {item.deliveryCompany .name}, - cost {item.priceEuro}€</option>
					})}
				</FormDropDown>
				{<p>Total cost: <b>{getTotalCost()}€</b></p>}
			</>
			: <p>Total cost: <b>0.00€</b></p>
			}
			{ (chosenProducts.length != 0) ? <FormButton onClick={e => handleOrderConfirm(e)}>Confirm order</FormButton> : null }
			<br />
			<FormButton onClick={() => handlePageChange('MainPage')}>Cancel</FormButton>
		</Container>
	);
}