import React, { useState, useEffect, useContext } from 'react';
import { UserProfile } from '../components/ProfilePage/UserProfile';
import { SellerProfile } from '../components/ProfilePage/SellerProfile';
import { UserContext } from '../services/UserContext';
import { variables } from '../services/variables';

export function Profile() {
	const [user, setUser] = useState(null);
	const { value, setValue } = useContext(UserContext);

	async function checkAunthentication() {
		try {
			const response = await fetch(variables.API_URL + 'auth/user')
			if (response.status == 200) {
				const data = await response.json();

				setUser(data)
				setValue(true);
			}
			else {
				throw (response.statusText)
			}
		}
		catch (err) {
			setValue(false);
			console.log(err)
		}
	}

	useEffect(() => {
		checkAunthentication()
	}, [])
	return (
		<div>
			{value == true ?
				<GetUserRole user={user} />
				: "Please Log in"
			}
		</div>
	);
}

function GetUserRole({ user }) {
	if (user.user === 'user') {
		return <UserProfile user={user} />;
	} else if (user.user === 'buyer') {
		return <SellerProfile user={user} />;
	}
}

