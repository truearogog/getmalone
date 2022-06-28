import React, { useState } from 'react';
import { NavMenu } from './components/NavMenu';
import { Login } from './components/Authentication/Login';
import { Register } from './components/Authentication/Register';
import { ProductContext } from './services/Contexts';

export function Layout(component) {
  const [products, setProducts] = useState([])
  const [chosenProducts, setChosenProducts] = useState([])

  const [pageEnabled, setpageEnabled] =
    useState({
      'LoginPage': false,
      'RegisterPage': false,
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

      setpageEnabled(allPages)
      return allPages
    }

    let allPages = reset()
    allPages[name] = true

    setpageEnabled(allPages)
  }

  return (
    <div>
      <ProductContext.Provider value={{ products, setProducts, chosenProducts, setChosenProducts }}>
        <NavMenu handlePageChange={name => changeActiveWindow(name)} />
        {pageEnabled['MainPage'] ? <div style={{ padding: '16px', marginTop: '48px' }}>
          {
            component.children
          }
        </div> : null}
        {pageEnabled['LoginPage'] ? <Login handlePageChange={name => changeActiveWindow(name)} /> : null}
        {pageEnabled['RegisterPage'] ? <Register handlePageChange={name => changeActiveWindow(name)} /> : null}
      </ProductContext.Provider>
    </div>
  );
}
