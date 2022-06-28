import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';
import { Orders } from './Orders'
import { ProductContext } from '../../services/Contexts'
import { variables } from '../../services/variables';

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
  const [orders, setOrders] = useState([])

  const [error, setError] = useState('')

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

  async function getOrders() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }

    try {
      const response = await fetch(variables.API_URL + 'order/buyer', requestOptions);
      if (!response.ok) throw new Error(response.statusText)

      const data = await response.json();
      if (data.success == false) throw new Error(data.error)

      setOrders(data.data)
    }
    catch (err) {
      console.log(err)
      setError(err)
    }
  }

  useEffect(() => {
    setProductsFiltered(products)
    getOrders()
  }, [])

  return (
    <Container>
      <ProfileData data={user} />
      <ProductList handleProductChange={product => handleChosenProductChange(product)} chosenProducts={chosenProducts} handleSearchClick={name => handleSearchClick(name)} getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} title={title} products={productsFiltered} />
      <Orders data={orders} />
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
`;
