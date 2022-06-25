import React, { useState, useEffect} from 'react';
import { variables } from '../../services/variables';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';

export function SellerProfile({ handlePageChange, user }) {

  const [products, setSellerProducts] = useState([])
  const [error, setError] = useState('')

  async function getSellerProducts() {
    //console.log(user.user.id)
    const formData = { id: user.user.id }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    //console.log(requestOptions)

		try {
			const response = await fetch(variables.API_URL + 'product/seller', requestOptions);
      //console.log(response)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

      setSellerProducts(data.data);
		}
		catch (err) {
			console.log(err)
			setError(""+err)
		}
	}

	useEffect(() => {
		getSellerProducts()
	}, [])

  return (
    <Container>
      <ProfileData data={user} />
      {<ProductList handlePageChange={name => handlePageChange(name)} products={products} />}
      <p style={{ color: 'red' }}>{error}</p>
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
`;