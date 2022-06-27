import React, { useState, useEffect } from 'react';
import { variables } from '../../services/variables';
import { v4 as uuidv4 } from 'uuid';
import { Container, FormContainer, FormTitle, FormFields, FormItem, FormDropDown, FormButton, BigFormButton } from '../Form/FormTemplate'
import { Comment } from './Comments/Comment'
import { CommentForm } from './Comments/CommentForm'
import styled from 'styled-components';


export function Product({ handlePageChange, productid: productId }) {

	const [product, setProductById] = useState('')
	const [comments, setComments] = useState('')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState([])
	const [priceEuro, setPriceEuro] = useState('')
	const [currentCategory, setCurrentCategory] = useState({ id: 1 })
	const [error, setError] = useState('')
	const [isUpdated, setUpdateStatus] = useState('')

	async function getProductById() {
		const formData = { id: productId }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}
		try {
			const response = await fetch(variables.API_URL + 'product/get', requestOptions);
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			setProductById(data.data)
			setName(data.data.name)
			setDescription(data.data.description)
			setPriceEuro(data.data.priceEuro)
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}
	}

	async function getComments() {
		const formData = { id: productId }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}
		try {
			const response = await fetch(variables.API_URL + 'comment/product', requestOptions);
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			setComments(data.data);
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}
	}

	useEffect(() => {
		getProductById()
		getComments()
	}, [])

	async function getCategories() {
		try {
			const response = await fetch(variables.API_URL + 'product/allcategories');
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error)

			setCategories(data.data);

			typeof (product.category.id) !== 'undefined' ? setCurrentCategory(data.data.find(category => category.id === product.category.id)) : setCurrentCategory(data.data[0]);

		}
		catch (err) {
			console.log(err)
			setError(err)
		}
	}

	useEffect(() => {
		if (product != null)
			getCategories()
	}, [product])


	async function handleSubmit(e) {
		e.preventDefault()

		const formData = { id: product.id, name: name, description: description, categoryId: currentCategory.id, priceEuro: priceEuro }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			const response = await fetch(variables.API_URL + 'product/update', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			setUpdateStatus(true)
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}
	}

	async function handleProductDelete() {

		const formData = { id: product.id }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			const response = await fetch(variables.API_URL + 'product/delete', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			handlePageChange('MainPage')
			alert("Product Deleted!")
			
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}
	}

	function onChange(e, setFunction, maxSymbols = 2) {
		if (e.target.value !== '' && e.target.value.length - 1 < maxSymbols) {
			if (!isNaN(e.target.value)) {
				setFunction(e.target.value)
			}
		}
	}

	return (
		<Container>
			<ProductItem>
				<Logo>
					<Image src={require('../../images/product-pictures/0.png')} />
				</Logo>
				<FormContainer onSubmit={handleSubmit}>
					<FormFields>
						Category:
						<FormDropDown onChange={(e) => setCurrentCategory(categories[e.target.value - 1])} value={currentCategory.id} name="categories">
							{categories !== []
								? categories.map(item => <option key={uuidv4()} value={item.id}>{item.name}</option>)
								: null}
						</FormDropDown>
						Name:
						<FormItem type="text" placeholder="Product name" name="name" value={name} onChange={e =>
							setName(e.target.value)} />
						Description:
						<FormItem type="text" placeholder="Product description" name="description" value={description} onChange={e =>
							setDescription(e.target.value)} />
						Price:
						<FormItem type="text" placeholder="Price of the product in euro" name="priceEuro" value={priceEuro} onChange={e =>
							onChange(e, setPriceEuro, 6)} />
						<BigFormButton type="submit">Save Changes</BigFormButton>
						<SuccessMessage>{isUpdated === true ? "Successfully Updated!" : <br/>}</SuccessMessage>
					</FormFields>
				</FormContainer>
			</ProductItem>
			
			<Red>
				<FormButton onClick={handleProductDelete}>Delete Product</FormButton>
			</Red>
			<FormButton onClick={() => handlePageChange('MainPage')}>Cancel</FormButton>

			<CommentWrapper>
				<CommentForm productId={product.id} getComments={getComments}/>
				
				{comments != ''
					? comments.map(comment => <Comment key={uuidv4()} data={comment} />)
					: <p>No comments yet...</p>}
			</CommentWrapper>
		</Container>
	);
}

const ProductItem = styled.div`
	display: flex;
	justify-content: flex-start;
	padding-bottom: 30px;

	form {
		margin: 0;
	}
`
const Logo = styled.div`
	padding-left: 12%;
`;
const Image = styled.img`
	padding-top: 60px;
	object-fit: cover;
	width: 300px;
	height: 300px;
	margin: 0 auto;
	border-radius: 50%;
`;
const CommentWrapper = styled.div`
	display: flex;
	flex-direction: column;
`
const SuccessMessage = styled.div`
	color: #77dd77;
	width: 100%;
    padding-top: 15px;
`
const Red = styled.div`
	button {
		border: 1px solid #ff5148;
		background: #ff5148!important;
		&:hover {
			border: 1px solid #ff2015!important;
			background: #ff2015!important;
		}
	}
`