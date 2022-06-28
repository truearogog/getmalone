import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';
import { ProductContext } from '../../services/Contexts'

let title = "Recommended Products";

let products = [
  {
    id: 101,
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
    id: 102,
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
    id: 103,
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
    id: 104,
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
    id: 105,
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
  const { chosenProducts, setChosenProducts } = useContext(ProductContext)
  
  const [productsFiltered, setProductsFiltered] = useState([])

  function handleSearchClick(name) {
    setProductsFiltered(products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase())))
  }
  
  function handleChosenProductChange(product) {
    if (product === 'reset') {
      setChosenProducts([])
      return
    }

    let tempChosenProducts = chosenProducts
    if (tempChosenProducts.some(item => item.id === product.id)) {
      tempChosenProducts = tempChosenProducts.filter(item => item.id !== product.id)
    }
    else {
      tempChosenProducts.push(product)
    }

    setChosenProducts(tempChosenProducts)
  }
  
  useEffect(() => {
    setProductsFiltered(products)
  }, [])

  return (
    <Container>
      <ProfileData data={user} />
      <ProductList handleProductChange={product => handleChosenProductChange(product)} chosenProducts={chosenProducts} handleSearchClick={name => handleSearchClick(name)} getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} title={title} products={productsFiltered} />
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
`;
