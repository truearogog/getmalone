import React, { useState, useContext } from 'react';
import { UserContext } from '../../services/UserContext';
import { variables } from '../../services/variables';
import {FormContainer, FormTitle, FormFields, FormItem, FormButton} from '../Form/FormTemplate'
import { useHistory } from 'react-router-dom';


export function Login({ handlePageChange }) {
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const history = useHistory()

	async function handleSubmit(e) {
		e.preventDefault()

		let formData = { email: email, password: password }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			let response = await fetch(variables.API_URL + 'auth/login', requestOptions)
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			let data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			response = await fetch(variables.API_URL + 'auth/user')
			if (!response.ok) throw new Error(response.statusText)

			data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			handlePageChange('MainPage')

			setUser(data.data)

			history.push('/');

			alert("User logged in");
		}
		catch (err) {
			console.log(err)
			setError('' + err)
		}
	}

	return (
		<div>
			<FormContainer onSubmit={handleSubmit}>
				<FormTitle>Login:</FormTitle>
				<FormFields>
					<FormItem type="text" placeholder="Email" name="email" value={email} onChange={e =>
						setEmail(e.target.value)} />
					<FormItem type="password" placeholder="Password" name="password" value={password} onChange={e =>
						setPassword(e.target.value)} />
					<FormButton type="submit">Submit</FormButton>
				</FormFields>
			</FormContainer>
			<p style={{ color: 'red' }}>{error}</p>
		</div>
	)
}