import React, { useState, useEffect} from 'react';
import { variables } from '../../services/variables';
import { v4 as uuidv4 } from 'uuid';
import { Container, FormContainer, FormTitle, FormFields, FormItem, FormDropDown, FormButton } from '../Form/FormTemplate'

export function Product({ handlePageChange, productid }) {

  const [product, setProductById] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [categories, setCategories] = useState([])
	const [priceEuro, setPriceEuro] = useState('')
	const [currentCategory, setCurrentCategory] = useState({ id: 1 })

  async function getProductById() {
    const formData = { id: productid }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
		try {
			const response = await fetch(variables.API_URL + 'product/get', requestOptions);
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

      setProductById(data.data);
		}
		catch (err) {
			console.log(err)
			setError(""+err)
		}
	}

  useEffect(() => {
		getProductById()
	}, [])

	useEffect(() => {
    getCategories()
	}, [product])

	async function getCategories() {
		try {
			const response = await fetch(variables.API_URL + 'product/allcategories');
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error)

			setCategories(data.data);

      console.log(data.data)
      console.log(product.category.id)
      console.log(data.data.some(category => category.id === product.category.id))
      
      typeof(product.category.id) !== 'undefined' ? setCurrentCategory(data.data.find(category => category.id === product.category.id)) : setCurrentCategory(data.data[0]);
			
		}
		catch (err) {
			console.log(err)
			setError(err)
		}
	}

  async function handleSubmit(e) {
		e.preventDefault()

		const formData = { name: name, description: description, categoryId: currentCategory.id, priceEuro: priceEuro }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			const response = await fetch(variables.API_URL + 'product/update', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			handlePageChange('HomePage')

			alert("Product updated");
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}
	}

	function onChange(e, setFunction, maxSymbols = 2) {
		if (e.target.value !== '' && e.target.value.length - 1 < maxSymbols) {
			if (!isNaN(e.target.value)) {
				setFunction(e.target.value)
			}
		}
	}

  return (
    <Container>
      <FormContainer>
				<FormFields>
          Category:
					<FormDropDown onChange={(e) => setCurrentCategory(categories[e.target.value - 1])} value={currentCategory.id} name="categories">
						{categories.map(item => {
							return <option key={uuidv4()} value={item.id}>{item.name}</option>
						})}
					</FormDropDown>
          Name:
					<FormItem type="text" placeholder="Product name" name="name" value={product.name} onChange={e =>
						setName(e.target.value)} />
          Description:
					<FormItem type="text" placeholder="Product description" name="description" value={product.description} onChange={e =>
						setDescription(e.target.value)} />
          Price:
					<FormItem type="text" placeholder="Price of the product in euro" name="priceEuro" value={product.priceEuro} onChange={e =>
						onChange(e, setPriceEuro, 6)} />
					<FormButton type="submit">Save Changes</FormButton>
				</FormFields>
			</FormContainer>

      <FormButton onClick={() => handlePageChange('MainPage')}>Cancel</FormButton>
    </Container>
  );
}