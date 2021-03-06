import React, { useState, useEffect, useContext } from 'react';
import { variables } from '../../services/variables';
import { v4 as uuidv4 } from 'uuid';
import { Container, FormContainer, FormFields, FormItem, FormDropDown, FormButton, BigFormButton } from '../Form/FormTemplate'
import { Comment } from './Comments/Comment'
import { CommentForm } from './Comments/CommentForm'
import styled from 'styled-components';
import { UserContext } from '../../services/Contexts'


export function Product({ handlePageChange, productid: productId, userId }) {
	const { user, setUser } = useContext(UserContext)


	const [product, setProductById] = useState('')
	const [comments, setComments] = useState('')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [categories, setCategories] = useState([])
	const [priceEuro, setPriceEuro] = useState('')
	const [currentCategory, setCurrentCategory] = useState({ id: 1 })
	const [error, setError] = useState('')

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
			setImageUrl(data.data.imageUrl)
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

		const formData = { id: product.id, name: name, description: description, imageUrl: imageUrl, categoryId: currentCategory.id, priceEuro: priceEuro }
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

			handlePageChange('MainPage')
			alert("Product Updated!")
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
					<Image src={product?.imageUrl} />
				</Logo>
				{(typeof (product?.seller) !== 'undefined' && product?.seller?.user.id == userId) ?
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
							Image URL:
							<FormItem type="text" placeholder="Image URL" name="ImageUrl" value={imageUrl} onChange={e =>
								setImageUrl(e.target.value)} />
							Price:
							<FormItem type="text" placeholder="Price of the product in euro" name="priceEuro" value={priceEuro} onChange={e =>
								onChange(e, setPriceEuro, 6)} />
							<div>
								<BigFormButton type="submit">Save Changes</BigFormButton>
								<Red>
									<BigFormButton onClick={handleProductDelete}>Delete Product</BigFormButton>
								</Red>
							</div>
						</FormFields>
					</FormContainer>
					:
					<InfoContainer>
						<p><span className="bold">Name: </span>{name}</p>
						<p><span className="bold">Description: </span>{description}</p>
						<p><span className="bold">Price: </span>{priceEuro}???</p>
						<p><span className="bold">Category: </span>{currentCategory.name}</p>
						<p><span className="bold">Seller: </span>{(typeof (product.seller) !== 'undefined') ? <span>{product.seller.user.name} {product.seller.user.surname}</span> : "Loading:"}</p>
					</InfoContainer>}
			</ProductItem>

			<FormButton onClick={() => handlePageChange('MainPage')}>Cancel</FormButton>

			< CommentWrapper >
				{user?.role === 'buyer' ?
					< CommentForm productId={product.id} getComments={getComments} />
					: null
				}
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
	
	@media (max-width: 1400px) {
		padding-left: 4%;
	}
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
const InfoContainer = styled.div`
	padding-top: 100px;
	padding-left: 15%;
	width: 40%;
	text-align: left;
	font-size: 20px;

	.bold {
		font-weight: 600;
	}
`;