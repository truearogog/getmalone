import React, { useContext } from 'react';
import styled from 'styled-components'
import { FormButton } from '../Form/FormTemplate'
import { v4 as uuidv4 } from 'uuid';
import { Search } from './Search'
import { FilterCategories } from './FilterCategories'
import { UserContext } from '../../services/Contexts'


const id = 0
let forceUpdate
export function ProductList({ userButton, isCart = false, getId = () => { }, handleSearchClick, handleCategoriesClick, handlePageChange = () => { }, title = "Product List", handleProductChange = () => { }, products, chosenProducts = [] }) {
	forceUpdate = React.useReducer(() => ({}), {})[1]

	return (
		<ProductListWrapper>
			<ListTitle>
				{title}
			</ListTitle>
			<Float>
				{ (chosenProducts.length != 0 || !isCart) ? <Search handleSearchClick={handleSearchClick} /> : null }
				{ userButton }
			</Float>
			{(chosenProducts.length != 0 || !isCart) ? <FilterCategories handleSearchClick={handleCategoriesClick} />
				: null}
			<List getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} handleProductChange={name => handleProductChange(name)} data={products} chosenProducts={chosenProducts} />
		</ProductListWrapper>
	)
}

function List({ getId, handlePageChange, handleProductChange, data, chosenProducts }) {
	return (
		<ListWrapper>
			{data.map(dataItem => <ProductItem getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} handleProductChange={name => handleProductChange(name)} key={uuidv4()} data={dataItem}
				isChosen={typeof (chosenProducts.some(item => item.id === dataItem.id)) != 'undefined'
					? chosenProducts.some(item => item.id === dataItem.id)
					: false} />)}
		</ListWrapper>
	)
}

function ProductItem({ getId, handlePageChange, handleProductChange, data, isChosen }) {
	const { user, setUser } = useContext(UserContext);

	return (
		<ProductItemWrapper style={isChosen === true ? { backgroundColor: '#cecccc' } : null}>
			<div onClick={() => {
				handlePageChange('ProductPage')
				data.id ? getId(data.id) : getId(null);
			}}>
				<Image src={data?.imageUrl} />
				<Title>{data.name}</Title>
				<Description>{data.description ? `"${data.description}"` : "no description available"}</Description>
				<Price>{(Math.round((data.priceEuro + Number.EPSILON) * 100) / 100).toFixed(2)}€</Price>
				<Info>
					<p>Category: <b>{data.category.name}</b></p>
					<p>Seller: <b>{data.seller.user.name + ' ' + data.seller.user.surname}</b></p>
				</Info>
			</div>
			{user?.role === 'buyer' ?
				<>
					<FormButton onClick={() => {
						handleProductChange(data)
						forceUpdate()
					}}>
						{isChosen === true ? "Remove from Cart" : "Add to Cart"}
					</FormButton>
					<p style={isChosen === true ? { color: 'green', lineHeight: '20px'} : null}> {isChosen === true ? "Successfully Added!" : <br />}</p>
				</>
				: null}
		</ProductItemWrapper>
	)
}

//-----ProductList-----
const ProductListWrapper = styled.div`
	padding-top: 40px;
	width: 90%;
	margin: 0 auto;
	z-index: 2;
`;
const ListTitle = styled.div`
	padding-bottom: 15px;
	font-size: 40px;
	font-weight: 600;
	text-align: center;
	z-index: 2;
`;
const Float = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	z-index: 2;
	
	& > *: first-child {
		top: 0;
		width: 50%;
	}
`

//-----List-----
const ListWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
	z-index: 2;
`;


//-----ProductItem-----
const ProductItemWrapper = styled.div`
	width: 21%;
	z-index: 2;
	@media(max-width: 1500px) {
		width: 30%;
	}

	@media(max-width: 1000px) {
		width: 45%;
	}

	@media(max-width: 700px) {
		width: 90%;
	}

	text-align: center;
	padding-top: 20px;
	margin-top: 40px;
	line-height: 10px;
	transition: .2s;
	border-radius: 5px;
	
	&:hover{
		cursor: pointer;
		background-color: #adadad;
	}
`;
const Image = styled.img`
	object-fit: cover;
	height: 150px;
	width: 150px;
	max-width: 95%;
	margin: 0 auto;
	border-radius: 50%;
	z-index: 2;
`;
const Title = styled.p`
	padding-top: 10px;
	font-weight: 600;
	font-size: 20px;
`;
const Description = styled.p`
	display: block;
	font-size: 15px;
	font-style: italic;
	line-height: 20px;
	height: 40px;
`;
const Price = styled.p`
	padding-top: 5px;
  	padding-bottom: 5px;
	font-size: 26px;
`;
const Info = styled.div`
	font-family: 'Nanum Gothic', sans-serif;
	font-size: 16px;
	line-height: 15px;
	p {
		display: block;
		width: 90%;
		height: 20px;
	}
	b {
		white-space: pre;
	}
	@media (max-width: 1400px) {
		font-size: 14px;
	}
`;
