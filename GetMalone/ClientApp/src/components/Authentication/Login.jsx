import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { UserContext } from '../../services/UserContext';
import { variables } from '../../services/variables';

export function Login() {
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		let formData = { email: email, password: password }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			const response = await fetch(variables.API_URL + 'auth/login', requestOptions)
			if (!response.ok) throw new Error(response.statusText)

			const data = await response.json();
			console.log(data)
			
			try {
				const response = await fetch(variables.API_URL + 'auth/user')
				if (!response.ok) throw new Error(response.statusText)

				const data = await response.json();

				setUser(data)
			}
			catch (err) {
				setUser(null);
				console.log(err)
			}
		}
		catch (err) {
			console.log(err)
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
		</div>
	)
} 