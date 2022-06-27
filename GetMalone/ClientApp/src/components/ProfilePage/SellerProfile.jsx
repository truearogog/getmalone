import React, { useState, useEffect } from 'react';
import { variables } from '../../services/variables';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';

export function SellerProfile({ getId, handlePageChange, user }) {

  const [products, setSellerProducts] = useState([])
  const [error, setError] = useState('')

  const [productsFiltered, setProductsFiltered] = useState([])

  async function getSellerProducts() {
    const formData = { id: user.user.id }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }

    try {
      const response = await fetch(variables.API_URL + 'product/seller', requestOptions);
      if (!response.ok) throw new Error(response.statusText, requestOptions)

      const data = await response.json();
      if (data.success == false) throw new Error(data.error, requestOptions)

      setSellerProducts(data.data);
      setProductsFiltered(data.data)
    }
    catch (err) {
      console.log(err)
      setError("" + err)
    }
  }

  useEffect(() => {
    getSellerProducts()
  }, [])

  function handleSearchClick(name) {
    setProductsFiltered(products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase())))
  }

  return (
    <Container>
      <ProfileData data={user} />
      {<ProductList handleSearchClick={name => handleSearchClick(name)} getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} products={productsFiltered} />}
      <p style={{ color: 'red' }}>{error}</p>
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
`;