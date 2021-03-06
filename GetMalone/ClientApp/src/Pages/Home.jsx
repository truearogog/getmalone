import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AddProduct } from '../components/Home/AddProduct'
import { ShoppingCart } from '../components/Home/ShoppingCart'
import { UserContext, ProductContext, PagesContext } from '../services/Contexts';
import { variables } from '../services/variables';
import { ProductList } from '../components/ProfilePage/ProductList';
import { Container } from '../components/Form/FormTemplate';
import { Product } from '../components/ProductPage/Product'

export function Home() {
  const { user, setUser } = useContext(UserContext)
  const { products, setProducts, chosenProducts, setChosenProducts } = useContext(ProductContext)
  const { componentEnabled, setComponentEnabled } = useContext(PagesContext)

  const [productsFiltered, setProductsFiltered] = useState([])
  const [currentCategory, setCurrentCategory] = useState({ id: -1 })
  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState('')

  const [productId, setId] =
    useState({
      'id': -1
    });

  async function getProducts() {
    try {
      const response = await fetch(variables.API_URL + 'product/all');
      if (!response.ok) throw new Error(response.statusText)

      const data = await response.json();
      if (data.success == false) throw new Error(data.error)

      setProducts(data.data)
      setProductsFiltered(data.data)
    }
    catch (err) {
      console.log(err)
      setError("" + err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  function getId(id) {
    function reset() {
      let prodId = productId

      setId(prodId)
      return prodId
    }

    let prodId = reset()
    prodId['id'] = id

    setId(prodId)
  }

  function changeActiveWindow(name) {
    function getPages() {
      let pagesDict = []
      Object.entries(componentEnabled).forEach(([key, value]) => {
        pagesDict[key] = value
      })

      return pagesDict
    }

    function reset() {
      let allPages = getPages()
      for (let i in allPages) {
        allPages[i] = false
      }

      setComponentEnabled(allPages)
      return allPages
    }

    let allPages = reset()
    allPages[name] = true

    setComponentEnabled(allPages)

    getProducts()
  }

  function userButton() {
    if (user === false || !user)
      return null

    if (user.role === 'buyer')
      return <Button onClick={() => changeActiveWindow('ShoppingCartPage')}><div>Shopping cart</div></Button>
    else
      return <Button onClick={() => changeActiveWindow('AddProductPage')}><div>Add product</div></Button>

  }

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

  function handleSearchClick(name, categoryId = currentCategory.id) {
    setSearchText(name)
    if (categoryId === -1 || categoryId == null) {
      setProductsFiltered(products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase())))
    }
    else {
      setProductsFiltered(products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase())
      && product.category.id === categoryId}))
    }
  }

  function handleCategoriesClick(category) {
    setCurrentCategory(category)
    console.log(category)
    handleSearchClick(searchText, category?.id)
  }

  return (
    <div>
      {componentEnabled['ProductPage'] ? <Product handlePageChange={name => changeActiveWindow(name)} userId={user?.info.user.id} productid={productId.id} /> : null}
      {componentEnabled['AddProductPage'] ? <AddProduct handlePageChange={name => changeActiveWindow(name)} /> : null}
      {componentEnabled['ShoppingCartPage'] ? <ShoppingCart handleProductChange={product => handleChosenProductChange(product)} chosenProducts={chosenProducts} handlePageChange={name => changeActiveWindow(name)} getId={id => getId(id)} /> : null}
      {componentEnabled['MainPage'] ?
        <Container>
          <ProductList userButton={userButton()} handleSearchClick={name => handleSearchClick(name)} handleCategoriesClick={category => handleCategoriesClick(category)} handlePageChange={name => changeActiveWindow(name)} getId={id => getId(id)} handleProductChange={product => handleChosenProductChange(product)} products={productsFiltered} chosenProducts={chosenProducts} />
        </Container>
        : null}
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}

const Button = styled.div`
  border-radius: 5px;
  background: #1089ff!important;
  cursor: pointer;
  transition: .5s;
  width: 40%;
  height: 50px;
  
  &:hover {
    background: #006fdc!important;
  }
  
  & > * {
    color: white;
  }
  
  & > div {
    padding-top: 10px;
  }
`