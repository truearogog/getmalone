import React from 'react';
import styled from 'styled-components'
import { ProfileData } from './ProfileData';
import { ProductList } from './ProductList';

let title = "Recommended Products";

let profile = [
  {
    id: 0,
    name: "John",
    surname: "Smith",
    phone: "23456789",
    mail: "test@example.com",
    interests: "apples, bananas"
  }
]

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
    name: "Cucumber",
    description: "fresh and homemade",
    cost: 0.49,
    type: "Vegetables",
    date: "2022-07-19",
    seller: 2
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

export function UserProfile({ user }) {
  return (
    <Container>
      <ProfileData data={profile} />
      <ProductList title={title} products={products} />
    </Container>
  );
}
const Container = styled.div`
  	width: 60%;
	margin: 0 auto;
	background: rgba(255, 0, 0, 0.8);
`;
