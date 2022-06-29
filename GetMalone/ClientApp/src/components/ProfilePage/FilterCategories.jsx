import React, { useState, useEffect } from 'react'
import searchIcon from '../../images/icons/search.svg'
import styled from 'styled-components'
import { FormDropDown } from '../Form/FormTemplate'
import { v4 as uuidv4 } from 'uuid';
import { variables } from '../../services/variables';

export function FilterCategories({ handleSearchClick = () => { } }) {
	const [categories, setCategories] = useState([])
	const [currentCategory, setCurrentCategory] = useState({ id: -1 })
	
	const [error, setError] = useState('')
	
	async function getCategories() {
		try {
			const response = await fetch(variables.API_URL + 'product/allcategories');
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error)

			setCategories(data.data);
		}
		catch (err) {
			console.log(err)
			setError(err)
		}
	}

	useEffect(() => {
		getCategories()
	}, [])

	function handleCategoryChange(e) {
		console.log(e.target.value)
		if (e.target.value == -1) {
			setCurrentCategory({ id: -1 })
			handleSearchClick({ id: -1 })
		}
		else {
			setCurrentCategory(categories[e.target.value - 1])
			handleSearchClick(categories[e.target.value - 1])
		}
			
	}

	return (
		<Container>
			<FormDropDown onChange={(e) => handleCategoryChange(e)} value={currentCategory.id} name="categories">
				<option key={uuidv4()} value={-1}>All categories</option>
				{categories.map(item => {
					return <option key={uuidv4()} value={item.id}>{item.name}</option>
				})}
			</FormDropDown>
		</Container>
	)
}

const Container = styled.div`
	z-index: 100;
`