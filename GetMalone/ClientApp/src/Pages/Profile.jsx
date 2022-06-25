import React, { useState, useContext } from 'react';
import { UserProfile } from '../components/ProfilePage/UserProfile';
import { SellerProfile } from '../components/ProfilePage/SellerProfile';
import { Product } from '../components/ProductPage/Product'
import { UserContext } from '../services/UserContext';

export function Profile() {

	const [pageEnabled, setpageEnabled] =
	useState({
		'ProductPage': false,
		'MainPage': true
	});

	function changeActiveWindow(name) {
		function getPages() {
			let pagesDict = []
				Object.entries(pageEnabled).forEach(([key, value]) => {
				pagesDict[key] = value
			})

			return pagesDict
		}

		function reset() {
			let allPages = getPages()
			for (let i in allPages) {
				allPages[i] = false
			}

			setpageEnabled(allPages)
			return allPages
		}

		let allPages = reset()
		allPages[name] = true

		setpageEnabled(allPages)
	}

	const { user, setUser } = useContext(UserContext);

	return (
		<div>
			{user != null ?
				<>
					{pageEnabled['MainPage'] ? <GetUserRole handlePageChange={name => changeActiveWindow(name)} user={user} /> : null}
					{pageEnabled['ProductPage'] ? <Product handlePageChange={name => changeActiveWindow(name)} /> : null}
				</>
				: "Please Log in"
			}
		</div>
	);
}

function GetUserRole({ handlePageChange, user }) {
	if (user.role === 'buyer') {
		return <UserProfile handlePageChange={name => handlePageChange(name)} user={user.info} />;
	}
	else if (user.role === 'seller') {
		return <SellerProfile handlePageChange={name => handlePageChange(name)} user={user.info} />;
	}
	else
		return <div></div>
}

