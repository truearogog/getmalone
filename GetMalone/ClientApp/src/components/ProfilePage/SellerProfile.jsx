import React, { useState, useEffect} from 'react';
import { variables } from '../../services/variables';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';

export function SellerProfile({ user }) {

  const [products, setSellerProducts] = useState([])
  const [error, setError] = useState('')

  async function getSellerProducts() {
		try {
			const response = await fetch(variables.API_URL + 'product/sellerproducts');
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error)

      setSellerProducts(data.data);
		}
		catch (err) {
			console.log("SellerProfile - "+err)
			setError(err)
		}
	}

	useEffect(() => {
		getSellerProducts()
	}, [])

  return (
    <Container>
      <ProfileData data={user} />
      {<ProductList products={products} />}
      <p style={{ color: 'red' }}>{error}</p>
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
`;