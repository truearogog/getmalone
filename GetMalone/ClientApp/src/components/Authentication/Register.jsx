import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components'
import { UserContext } from '../../services/UserContext';
import { variables } from '../../services/variables';

import { useHistory } from 'react-router-dom';


export function Register({ handlePageChange }) {
	const { user, setUser } = useContext(UserContext);

	const [userType, setUserType] = useState('buyer')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [mailindex, setMailindex] = useState('')
	const [interests, setInterests] = useState('')
	const [sertificateCodes, setSertificateCodes] = useState('')

	const [error, setError] = useState('')

	const history = useHistory()
	
	async function handleSubmit(e) {
		e.preventDefault()
		
		let formData
		let requestPath =  variables.API_URL + 'auth/register/'
		
		if (userType == 'buyer') {
			requestPath += 'buyer'
			formData = { email: email, password: password, phone: phone, name: name, surname: surname, mailindex: mailindex, interests: interests.split(', ') }
		}
		else {
			requestPath += 'seller'
			formData = { email: email, password: password, phone: phone, name: name, surname: surname, sertificateCodes: sertificateCodes.split(', ') }
		}

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		try {
			let response = await fetch(requestPath, requestOptions)
			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message)
			}

			login()
		}
		catch (err) {
			console.log(err)
			setError('error: ' + err)
		}
	}
	
	async function login() {
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

			setUser(data)

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
				<p>Drivers:</p>
				<select name="userType" id="type" onChange={e => { setUserType(e.target.value) }} value={userType}>
					<option value="buyer">Buyer</option>
					<option value="seller">Seller</option>
				</select>
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
				<label>
					Phone:
					<input type="text" name="phone" value={phone} onChange={e =>
						setPhone(e.target.value)} />
				</label>
				<label>
					Name:
					<input type="text" name="name" value={name} onChange={e =>
						setName(e.target.value)} />
				</label>
				<label>
					Surname:
					<input type="text" name="surname" value={surname} onChange={e =>
						setSurname(e.target.value)} />
				</label>
				{userType == 'buyer' ?
					<label>
						Mailindex:
						<input type="text" name="mailindex" value={mailindex} onChange={e =>
							setMailindex(e.target.value)} />
					</label>
					: null}
				{userType == 'buyer' ?
					<label>
						Interests:
						<input type="text" name="interests" value={interests} onChange={e =>
							setInterests(e.target.value)} />
					</label>
					: null}
				{userType == 'seller' ?
					<label>
						SertificateCodes:
						<input type="text" name="sertificateCodes" value={sertificateCodes} onChange={e =>
							setSertificateCodes(e.target.value)} />
					</label>
					: null}
				<button type="submit">Submit</button>
			</form>
			<p style={{ color: 'red' }}>{error}</p>
		</div>
	)
} 