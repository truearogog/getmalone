import React, { useState } from 'react';
import { NavMenu } from './components/NavMenu';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { ProductContext, PagesContext } from './services/Contexts';

export function Layout(component) {
  const [products, setProducts] = useState([])
  const [chosenProducts, setChosenProducts] = useState([])

  const [pageEnabled, setPageEnabled] =
    useState({
      'LoginPage': false,
      'RegisterPage': false,
      'MainPage': true
    });
  const [componentEnabled, setComponentEnabled] =
    useState({
      'AddProductPage': false,
      'ShoppingCartPage': false,
      'ProductPage': false,
      'MainPage': true
    });
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

      setPageEnabled(allPages)
      return allPages
    }

    let allPages = reset()
    allPages[name] = true

    setPageEnabled(allPages)
    
    if (name === 'MainPage')
      setComponentEnabled(allPages)
  }

  return (
    <div>
      <ProductContext.Provider value={{ products, setProducts, chosenProducts, setChosenProducts }}>
        <PagesContext.Provider value={{ componentEnabled, setComponentEnabled }}>
          <NavMenu handlePageChange={name => changeActiveWindow(name)} />
          {pageEnabled['MainPage'] ? <div style={{ padding: '16px', marginTop: '48px' }}>
            {
              component.children
            }
          </div> : null}
          {pageEnabled['LoginPage'] ? <Login handlePageChange={name => changeActiveWindow(name)} /> : null}
          {pageEnabled['RegisterPage'] ? <Register handlePageChange={name => changeActiveWindow(name)} /> : null}
        </PagesContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}
