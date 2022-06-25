import React, { useState, useEffect, useContext } from 'react';
import { NavMenu } from './components/NavMenu';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { UserContext } from './services/UserContext';
import { variables } from './services/variables';
import { AddProduct } from './components/Home/AddProduct'
import { ShoppingCart } from './components/Home/ShoppingCart'

export function Layout(component) {

  const [chosenProducts, setChosenProducts] = useState([])

  const [pageEnabled, setpageEnabled] =
    useState({
      'LoginPage': false,
      'RegisterPage': false,
      'AddProductPage': false,
      'ShoppingCartPage': false,
      'MainPage': true
    });

  const forceUpdate = React.useReducer(() => ({}), {})[1]

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
  }

  return (
    <div>
      <NavMenu handlePageChange={name => changeActiveWindow(name)} />
      {pageEnabled['MainPage'] ? <div style={{ padding: '16px', marginTop: '48px' }}>
        {
          component.children
        }
      </div> : null}
      {pageEnabled['LoginPage'] ? <Login handlePageChange={name => changeActiveWindow(name)} /> : null}
      {pageEnabled['RegisterPage'] ? <Register handlePageChange={name => changeActiveWindow(name)} /> : null}
      {pageEnabled['AddProductPage'] ? <AddProduct handlePageChange={name => changeActiveWindow(name)} /> : null}
      {pageEnabled['ShoppingCartPage'] ? <ShoppingCart handleProductChange={product => handleChosenProductChange(product)} chosenProducts={chosenProducts} handlePageChange={name => changeActiveWindow(name)} /> : null}
    </div>
  );
}
