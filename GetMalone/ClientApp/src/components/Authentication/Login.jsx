import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { UserContext } from '../../services/UserContext';
import { variables } from '../../services/variables';

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
      if(data.success == false) throw new Error(data.error, requestOptions)

			response = await fetch(variables.API_URL + 'auth/user')
			if (!response.ok) throw new Error(response.statusText)

			data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)
				
			handlePageChange('MainPage')

			setUser(data.data)

			history.push('/');
		}
		catch (err) {
			console.log(err)
			setError('error: ' + err)
		}
	}

	return (
		<div style={{ padding: '16px', marginTop: '48px' }}>
			<form onSubmit={handleSubmit}>
				<label>
					email:
					<input type="text" name="email" value={email} onChange={e =>
						setEmail(e.target.value)} />
				</label>
				<label>
					password:
					<input type="password" name="password" value={password} onChange={e =>
						setPassword(e.target.value)} />
				</label>
				<button type="submit">Submit</button>
			</form>
			<p style={{ color: 'red' }}>{error}</p>
		</div>
	)
} 