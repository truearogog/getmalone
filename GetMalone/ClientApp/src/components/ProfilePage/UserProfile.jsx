import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';

let title = "Recommended Products";

let products = [
  {
    name: "Apple",
    description: "best apples",
    priceEuro: 0.99,
    type: "Fruits",
    date: "2022-06-23",
    category: { name: 'aa' },
    seller: {
      user: {
        name: 'bb',
        surname: 'cc'
      },
    },
  },
  {
    name: "Potato",
    description: "nice and cheap",
    priceEuro: 0.39,
    type: "Vegetables",
    date: "2022-07-13",
    category: { name: 'aa' },
    seller: {
      user: {
        name: 'bb',
        surname: 'cc'
      },
    },
  },
  {
    name: "Cucumber",
    description: "fresh and homemade",
    priceEuro: 0.49,
    type: "Vegetables",
    date: "2022-07-19",
    category: { name: 'aa' },
    seller: {
      user: {
        name: 'bb',
        surname: 'cc'
      },
    },
  },
  {
    name: "Pear",
    description: "yummy",
    priceEuro: 1.29,
    type: "Fruits",
    date: "2022-05-14",
    category: { name: 'aa' },
    seller: {
      user: {
        name: 'bb',
        surname: 'cc'
      },
    },
  },
  {
    name: "Beetroot",
    description: null,
    priceEuro: 0.79,
    type: "Vegetables",
    date: "2022-09-23",
    category: { name: 'aa' },
    seller: {
      user: {
        name: 'bb',
        surname: 'cc'
      },
    },
  },
]



export function UserProfile({ getId, handlePageChange, user }) {
  const [productsFiltered, setProductsFiltered] = useState([])
  
  function handleSearchClick(name) {
    setProductsFiltered(products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase())))
  }
  
  useEffect(() => {
    setProductsFiltered(products)
  }, [])
  
  return (
    <Container>
      <ProfileData data={user} />
      <ProductList handleSearchClick={name => handleSearchClick(name)} getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} title={title} products={productsFiltered} />
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
`;
