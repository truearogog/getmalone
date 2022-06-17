import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export function Home() {
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

  return (
    <div>
      <h1>GetMalone.lv</h1>
      <Grid>
        <Row>
          <b><p>Name</p></b>
          <b><p>Description</p></b>
          <b><p>Cost</p></b>
          <b><p>Type</p></b>
          <b><p>Date</p></b>
          <b><p>Seller</p></b>
        </Row>
        {data.map(data => <DataRow key={uuidv4()} data={data} />)}
      </Grid>
    </div>
  );
}

function DataRow({ data }) {
  return (
    <div>
      <Row>
        <p>{data.name}</p>
        <p>{data.description}</p>
        <p>{data.cost}</p>
        <p>{data.type}</p>
        <p>{data.date}</p>
        <p>{data.seller}</p>
      </Row >
    </div>
  );
}

const Grid = styled.div`
  display: flex; 
  flex-direction: column; 
  width: 100%; 
`

const Row = styled.div`
  display: flex; 
  text-align: center; 
  flex-direction: row; 
  align-items: center; 
  column-gap: 1.5rem; 
  
  & > * {
    width: 16%; 
    margin: auto;
  }
`