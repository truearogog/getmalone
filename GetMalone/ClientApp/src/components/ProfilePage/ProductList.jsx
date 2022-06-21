import React from 'react';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

const id = 0;

export function ProductList({ title = "Product List", products }) {
	return (
		<ProductListWrapper>
			<ListTitle>
				{title}
			</ListTitle>
			<List data={products}/>
		</ProductListWrapper>
	)
}

function List({ data }) {
	return (
		<ListWrapper>
			{data.map(data => <ProductItem key={uuidv4()} data={data}/>)}
		</ListWrapper>
	)
}

function ProductItem({ data }) {
	return (
		<ProductItemWrapper>
			<Image src={require('../../images/product-pictures/'+id+'.png')} />
			<Title>{data.name}</Title>
			<Description>{data.description}</Description>
			<Price>{data.cost}$</Price>
			<Info>
				<p>Type: <b>{data.type}</b></p>
				<p>Best Before: <b>{data.date}</b></p> 
				<p>Seller: <b>{data.seller}</b></p>
			</Info>
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
	padding-bottom: 20px;
	font-size: 40px;
	font-weight: 600;
	text-align: center;
`;

//-----List-----
const ListWrapper = styled.div`
	background: rgba(100, 100, 100, 0.8);
	display: flex;
    flex-wrap: wrap;
    width: 100%;
	margin-top: 25px;
`;


//-----ProductItem-----
const ProductItemWrapper = styled.div`
	background: rgba(100, 100, 100, 0.8);
	width: 25%;
	text-align: center;
	padding-top: 30px;
  padding-bottom: 20px;
	line-height: 10px;
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
`;
