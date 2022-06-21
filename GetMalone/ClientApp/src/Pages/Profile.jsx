import React, { useState, useEffect, useContext } from 'react';
import { UserProfile } from '../components/ProfilePage/UserProfile';
import { SellerProfile } from '../components/ProfilePage/SellerProfile';
import { UserContext } from '../services/UserContext';
import { variables } from '../services/variables';

export function Profile() {
	const { user, setUser } = useContext(UserContext);

	return (
		<div>
			{user != null ?
				<GetUserRole user={user} />
				: "Please Log in"
			}
		</div>
	);
}

function GetUserRole({ user }) {
	if (user.user == 'user') {
		return <UserProfile user={user} />;
	}
	else if (user.user == 'buyer') {
		return <SellerProfile user={user} />;
	}
	else
		return <div><h1>Unknown user</h1></div>
}

