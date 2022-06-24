import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../services/UserContext';
import { variables } from '../../services/variables';
import {FormContainer, FormTitle, FormFields, FormItem, FormDropDown, FormButton} from '../Form/FormTemplate'
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
		let requestPath = variables.API_URL + 'auth/register/'

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
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			login()
		}
		catch (err) {
			console.log(err)
			setError('' + err)
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
			if (data.success == false) throw new Error(data.error, requestOptions)

			response = await fetch(variables.API_URL + 'auth/user')
			if (!response.ok) throw new Error(response.statusText)

			data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			handlePageChange('MainPage')

			setUser(data.data)

			history.push('/profile');

			alert("User registered and logged in");
		}
		catch (err) {
			console.log(err)
			setUser(null)
			setError('' + err)
		}
	}

	return (
		<div>
			<FormContainer onSubmit={handleSubmit}>
				<FormTitle>Registration:</FormTitle>
				<FormFields>
					<FormDropDown name="userType" placeholder="Select Role" id="type" onChange={e => { setUserType(e.target.value) }} value={userType}>
						<option value="buyer">Buyer</option>
						<option value="seller">Seller</option>
					</FormDropDown>
					<FormItem className="half" type="text" placeholder="Name" name="name" value={name} onChange={e =>
						setName(e.target.value)} />
					<FormItem className="half" type="text" placeholder="Surname" name="surname" value={surname} onChange={e =>
						setSurname(e.target.value)} />
					<FormItem type="text" placeholder="Email" name="email" value={email} onChange={e =>
						setEmail(e.target.value)} />
					<FormItem type="password" placeholder="Password" name="password" value={password} onChange={e =>
						setPassword(e.target.value)} />
					<FormItem className="half" type="text" placeholder="Phone" name="phone" value={phone} onChange={e =>
						setPhone(e.target.value)} />
					{userType == 'buyer' ?
						<>
							<FormItem className="half" type="text" placeholder="Mail Index" name="mailindex" value={mailindex} onChange={e =>
								setMailindex(e.target.value)} />
							<FormItem type="text" placeholder="Interests" name="interests" value={interests} onChange={e =>
								setInterests(e.target.value)} />
						</>
						: null}
					{userType == 'seller' ?
						<FormItem className="half" type="text" placeholder="Certificate Codes" name="sertificateCodes" value={sertificateCodes} onChange={e =>
							setSertificateCodes(e.target.value)} />
						: null}
					<FormButton type="submit">Submit</FormButton>
				</FormFields>
			</FormContainer>
			<p style={{ color: 'red' }}>{error}</p>
		</div>
	)
} 