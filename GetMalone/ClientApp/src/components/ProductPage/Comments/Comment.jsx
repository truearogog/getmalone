import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

export function Comment({ data }) {
	
	const [buyer, setBuyer] = useState({name: ''})
	
	async function getBuyer() {
		/*const formData = { id: data.buyerId }
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}
		try {
			const response = await fetch(variables.API_URL + 'auth/user', requestOptions);
			if (!response.ok) throw new Error(response.statusText, requestOptions)

			const data = await response.json();
			if (data.success == false) throw new Error(data.error, requestOptions)

			setComments(data.data);
		}
		catch (err) {
			console.log(err)
			setError("" + err)
		}*/
	}

	useEffect(() => {
		getBuyer()
	}, [])

	return (
		<>
			<p>{data.created}</p>
			<p>{buyer.name}</p>
			<p>{data.body}</p>
		</>
	);
}


