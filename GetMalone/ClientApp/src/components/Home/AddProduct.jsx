import React, { useState, useEffect, useContext } from 'react';
import { FormContainer, FormTitle, FormFields, FormItem, FormDropDown, FormButton } from '../Form/FormTemplate'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../services/UserContext';
import { variables } from '../../services/variables';

export function AddProduct({ handlePageChange }) {
	const { user, setUser } = useContext(UserContext);

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState([])
	const [priceEuro, setPriceEuro] = useState('')
	const [currentCategory, setCurrentCategory] = useState({ id: 1 })
	const [error, setError] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		const formData = { name: name, description: description, categoryId: currentCategory.id, priceEuro: priceEuro }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			const response = await fetch(variables.API_URL + 'product/addproduct', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			handlePageChange('HomePage')

			alert("Product added");
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}
	}


	async function getCategories() {
		try {
			const response = await fetch(variables.API_URL + 'product/allcategories');
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error)

			setCategories(data.data);

			setCurrentCategory(data.data[0]);
		}
		catch (err) {
			console.log(err)
			setError(err)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	function onChange(e, setFunction, maxSymbols = 2) {
		if (e.target.value !== '' && e.target.value.length - 1 < maxSymbols) {
			if (!isNaN(e.target.value)) {
				setFunction(e.target.value)
			}
		}
	}

	return (
		<div style={{ padding: '16px', marginTop: '48px' }}>
			<Button onClick={() => handlePageChange('HomePage')}>Get me HOME!!!!</Button>
			<FormContainer onSubmit={handleSubmit}>
				<FormTitle>Add product:</FormTitle>
				<FormFields>
					Category:
					<FormDropDown onChange={(e) => setCurrentCategory(categories[e.target.value - 1])} value={currentCategory.id} name="categories">
						{categories.map(item => {
							return <option key={uuidv4()} value={item.id}>{item.name}</option>
						})}
					</FormDropDown>
					<FormItem type="text" placeholder="Product name" name="name" value={name} onChange={e =>
						setName(e.target.value)} />
					<FormItem type="text" placeholder="Product description" name="description" value={description} onChange={e =>
						setDescription(e.target.value)} />
					<FormItem type="text" placeholder="Price of the product in euro" name="priceEuro" value={priceEuro} onChange={e =>
						onChange(e, setPriceEuro, 6)} />
					<FormButton type="submit">Submit</FormButton>
				</FormFields>
			</FormContainer>
			<p style={{ color: 'red' }}>{error}</p>
		</div>
	)
}

const Button = styled.div`
  border-radius: 5px;
	border: solid;
  padding: 4px;
  cursor: pointer;
`