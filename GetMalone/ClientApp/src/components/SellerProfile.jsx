import React from 'react';
import styled from 'styled-components'
import { ProductList } from './ProductList';
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

const id = 0;

let data = [
  {
    name: "Apple",
    description: "best apples",
    cost: 0.99,
    type: "Fruits",
    date: "2022-06-23",
    seller: 2
  },
  {
    name: "Potato",
    description: "nice and cheap",
    cost: 0.39,
    type: "Vegetables",
    date: "2022-07-13",
    seller: 3
  },
  {
    name: "Pear",
    description: "yummy",
    cost: 1.29,
    type: "Fruits",
    date: "2022-05-14",
    seller: 1
  },
  {
    name: "Beetroot",
    description: null,
    cost: 0.79,
    type: "Vegetables",
    date: "2022-09-23",
    seller: 8
  },
]

export function SellerProfile() {
	return (
		<Container>

			<SellerProducts />

		</Container>	
	);
}
const Container = styled.div`
  	width: 60%;
	margin: 0 auto;
	background: rgba(255, 0, 0, 0.8);
`;

function SellerProducts() {
	return (
		<SellerProductsWrapper>
			<ListTitle>
				Products For Sale
			</ListTitle>
			<ProductList data={data}/>
		</SellerProductsWrapper>
	)
}
const SellerProductsWrapper = styled.div`
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