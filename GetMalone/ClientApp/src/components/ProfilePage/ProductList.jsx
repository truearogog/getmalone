import React, { useState } from 'react';
import styled from 'styled-components'
import { FormButton } from '../Form/FormTemplate'
import { v4 as uuidv4 } from 'uuid';

const id = 0
let forceUpdate
export function ProductList({ getId = () => { }, handlePageChange = () => { }, title = "Product List", handleProductChange = () => { }, products, chosenProducts = [] }) {
	forceUpdate = React.useReducer(() => ({}), {})[1]

	return (
		<ProductListWrapper>
			<ListTitle>
				{title}
			</ListTitle>
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
	//console.log(data)
	return (
		<ProductItemWrapper onClick={() => {
			handlePageChange('ProductPage')
			//console.log(data)
			data.id ? getId(data.id) : getId(null);
			
		}} style={isChosen === true ? { backgroundColor: '#cecccc' } : null}>
			<Image src={require('../../images/product-pictures/' + id + '.png')} />
			<Title>{data.name}</Title>
			<Description>{data.description}</Description>
			<Price>{data.priceEuro}€</Price>
			<Info>
				<p>Category: <b>{data.category.name}</b></p>
				<p>Seller: <b>{data.seller.user.name + ' ' + data.seller.user.surname}</b></p>
			</Info>
			<FormButton onClick={() => {
				handleProductChange(data)
				forceUpdate()
			}}>
				{isChosen === true ? "Remove from Cart" : "Add to Cart"}
			</FormButton>
			<p style={isChosen === true ? { color: 'green' } : null}> {isChosen === true ? "Successfully Added!" : <br/>}</p>
		</ProductItemWrapper>
	)
}

//-----ProductList-----
const ProductListWrapper = styled.div`
	padding-top: 90px;
	width: 90%;
	margin: 0 auto;
`;
const ListTitle = styled.div`
	padding-bottom: 15px;
	font-size: 40px;
	font-weight: 600;
	text-align: center;
`;

//-----List-----
const ListWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
	margin-top: 25px;
`;


//-----ProductItem-----
const ProductItemWrapper = styled.div`
	width: 21%;
	text-align: center;
	padding-top: 40px;
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
	margin: 0 auto;
	border-radius: 50%;
`;
const Title = styled.p`
	padding-top: 10px;
	font-weight: 600;
	font-size: 20px;
`;
const Description = styled.p`
	font-size: 15px;
	font-style: italic;
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
	b {
		white-space: pre;
	}
	@media (max-width: 1400px) {
		font-size: 14px;
	}
`;
