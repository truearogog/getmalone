import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

let isSellerCurrent = false

export function Orders({ getId = () => { }, handlePageChange = () => { }, isSeller = false, title = 'Your orders', data }) {
	isSellerCurrent = isSeller

	return (
		<>
			<ListTitle>{title}</ListTitle>
			{data.map(item => <OrderItem getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} key={uuidv4()} data={item} />)}
		</>
	)
}

function OrderItem({ getId, handlePageChange, data }) {
	return (
		<Order>
			<p>Ordered at: <b>{data?.created?.substring(0, data.created.indexOf('T'))} {data?.created?.substring(data.created.indexOf('T') + 1, data.created.indexOf('T') + 6)}</b></p>
			<p>Delivery option: <b>{data.deliveryOption.deliveryType.name}</b></p>
			<p>Delivery company: <b>{data.deliveryOption.deliveryCompany.name}</b></p>
			<p>Delivery price: <b>{data.deliveryOption.priceEuro}€</b></p>
			{isSellerCurrent ? <p>Buyer: <b>{data.buyer.user.name} {data.buyer.user.surname}</b></p> : null}
			<ProductList getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} data={data.products} />
			<TotalPrice>Total price: <b>{data.priceEuro}€</b></TotalPrice>
		</Order>
	)
}

function ProductList({ getId, handlePageChange, data }) {
	return (
		<ListWrapper>
			{data.map(dataItem => <ProductItem getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} key={uuidv4()} data={dataItem} />)}
		</ListWrapper>
	)
}

function ProductItem({ getId, handlePageChange, data }) {
	return (
		<ProductItemWrapper onClick={() => {
			handlePageChange('ProductPage')
			data.id ? getId(data.id) : getId(null);
		}}>
			<Image src={data?.imageUrl} />
			<Title>{data.name}</Title>
			<Description>{data.description ? `"${data.description}"` : "no description available"}</Description>
			<Price>{data.priceEuro}€</Price>
			<Info>
				<p>Category: <b>{data.category.name}</b></p>
				{!isSellerCurrent ? <p>Seller: <b>{data.seller.user.name + ' ' + data.seller.user.surname}</b></p> : null}
			</Info>
		</ProductItemWrapper>
	)
}


//-----Order-----
const ListTitle = styled.div`
	padding: 35px;
	font-size: 40px;
	font-weight: 600;
	text-align: center;
`;
const Order = styled.div`
	background: #dadada;
	text-align: center;
	width: 80%;
	margin: 0 auto;
	border-radius: 5px;
	margin-bottom: 50px;
	padding: 20px;
`
const TotalPrice = styled.p`
	padding-top: 10px;
	font-size: 26px;
`;

//-----List-----
const ListWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
	margin-top: -25px;
`;


//-----ProductItem-----
const ProductItemWrapper = styled.div`
	width: 31%;
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