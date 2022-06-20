import React from 'react';
import styled from 'styled-components'
import { ProductList } from './ProductList';
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

let products = [
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

			<ProductList products={products}/>

		</Container>	
	);
}
const Container = styled.div`
  	width: 60%;
	margin: 0 auto;
	background: rgba(255, 0, 0, 0.8);
`;