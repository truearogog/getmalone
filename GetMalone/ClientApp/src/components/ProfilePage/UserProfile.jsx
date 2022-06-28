import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { Orders } from './Orders'
import { variables } from '../../services/variables';

export function UserProfile({ getId, handlePageChange, user }) {
  const [orders, setOrders] = useState([])

  const [error, setError] = useState('')


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
    getOrders()
  }, [])

  return (
    <Container>
      <ProfileData data={user} />
      <Orders getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} data={orders} />
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
	margin: 0 auto;
	background: #f3f3f3;
  padding-bottom: 50px;
`;
