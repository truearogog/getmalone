import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { AddProduct } from '../components/Home/AddProduct'
import { ShoppingCart } from '../components/Home/ShoppingCart'
import { UserContext } from '../services/UserContext';

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

  const { user, setUser } = useContext(UserContext);

  const [pageEnabled, setpageEnabled] =
    useState({
      'AddProductPage': false,
      'ShoppingCartPage': false,
      'HomePage': true
    });

  const forceUpdate = React.useReducer(() => ({}), {})[1]

  function changeActiveWindow(name) {
    function getPages() {
      let pagesDict = []
      Object.entries(pageEnabled).forEach(([key, value]) => {
        pagesDict[key] = value
      })

      return pagesDict
    }

    function reset() {
      let allPages = getPages()
      for (let i in allPages) {
        allPages[i] = false
      }

      setpageEnabled(allPages)
      return allPages
    }

    let allPages = reset()
    allPages[name] = true

    setpageEnabled(allPages)

    forceUpdate()
  }

  function userButton() {
    if (user === false || null)
      return null

    if (user.user === 'buyer')
      return <Button onClick={() => changeActiveWindow('ShoppingCartPage')}><p>Shopping cart</p></Button>
    else
      return <Button onClick={() => changeActiveWindow('AddProductPage')}><p>Add product</p></Button>

  }

  return (
    <div>
      {pageEnabled['AddProductPage'] ? <AddProduct handlePageChange={name => changeActiveWindow(name)} /> : null}
      {pageEnabled['ShoppingCartPage'] ? <ShoppingCart handlePageChange={name => changeActiveWindow(name)} /> : null}
      {pageEnabled['HomePage'] ?
        <div>
          <Row>
            <h1>GetMalone.lv</h1>
            {
              userButton()
            }

          </Row>
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
        : null}
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

const Button = styled.div`
  border-radius: 5px;
  background-color: blue;
  padding: 16px;
  cursor: pointer;
  transition: .5s;
  
  &:hover {
    background-color: #1f03bb;
  }
  
  & > * {
    color: white;
  }
  
  & > p {
    margin: 0;
    padding: 0;
  }
`