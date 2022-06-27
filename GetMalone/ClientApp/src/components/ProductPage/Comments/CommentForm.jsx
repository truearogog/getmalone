import React, { useState, useContext } from 'react';
import { variables } from '../../../services/variables';
import {FormContainer, FormTitle, FormFields, FormItem, FormButton} from '../../Form/FormTemplate'


export function CommentForm({ productId, getComments = () => {} }) {

	const [text, setText] = useState('')
	const [error, setError] = useState('')
	
	async function handleSubmit(e) {
		e.preventDefault()

		const formData = { body: text, productId: productId }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			let response = await fetch(variables.API_URL + 'comment/create', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			let data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			setText("");

			getComments();

			alert("Comment posted");
		}
		catch (err) {
			console.log(err)
			setError('' + err)
		}
	}

	return (
		<div>
			<FormContainer onSubmit={handleSubmit}>
				<FormTitle>Add comment:</FormTitle>
				<FormFields>
					<FormItem type="text" placeholder="Text" name="text" value={text} onChange={e =>
						setText(e.target.value)} />
					<FormButton type="submit">Submit</FormButton>
				</FormFields>
			</FormContainer>
			<p style={{ color: 'red' }}>{error}</p>
		</div>
	)
}