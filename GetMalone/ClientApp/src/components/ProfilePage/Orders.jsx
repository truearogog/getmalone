import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

export function Orders({ data }) {
	return (
		<>
			<ListTitle>Orders</ListTitle>
			{data.map(item => <OrderItem key={uuidv4()} data={item} />)}
		</>
	)
}

function OrderItem({ data }) {
	return (
		<Order>
			<p>Ordered at: <b>{data?.created?.substring(0, data.created.indexOf('T'))} {data?.created?.substring(data.created.indexOf('T') + 1, data.created.indexOf('T') + 6)}</b></p>
			<p>Delivery option: <b>{data.deliveryOption.deliveryType.name}</b></p>
			<p>Delivery company: <b>{data.deliveryOption.deliveryCompany.name}</b></p>
			<p>Delivery price: <b>{data.deliveryOption.priceEuro}€</b></p>
			<ProductList data={data.products} />
			<p>Total price: <b>{data.priceEuro}€</b></p>
		</Order>
	)
}

function ProductList({ data }) {
	return (
		<ListWrapper>
			{data.map(dataItem => <ProductItem key={uuidv4()} data={dataItem} />)}
		</ListWrapper>
	)
}

function ProductItem({ data }) {
	return (
		<ProductItemWrapper>
			<Image src={data.imageUrl ? data.imageUrl : data.category.imageUrl} />
			<Title>{data.name}</Title>
			<Description>{data.description}</Description>
			<Price>{data.priceEuro}€</Price>
			<Info>
				<p>Category: <b>{data.category.name}</b></p>
				<p>Seller: <b>{data.seller.user.name + ' ' + data.seller.user.surname}</b></p>
			</Info>
		</ProductItemWrapper>
	)
}

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


const ListTitle = styled.div`
	padding-bottom: 15px;
	font-size: 40px;
	font-weight: 600;
	text-align: center;
`;

const Order = styled.div`
	background: #dadada;
	
	border-radius: 5px;
`