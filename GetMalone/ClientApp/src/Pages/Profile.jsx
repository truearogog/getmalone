import React, { useState, useContext } from 'react';
import { UserProfile } from '../components/ProfilePage/UserProfile';
import { SellerProfile } from '../components/ProfilePage/SellerProfile';
import { Product } from '../components/ProductPage/Product'
import { UserContext } from '../services/UserContext';

export function Profile() {
	const { user, setUser } = useContext(UserContext);
	
	
	const [pageEnabled, setpageEnabled] =
	useState({
		'ProductPage': false,
		'MainPage': true
	});
	
	async function checkAunthentication() {
    try {
      const response = await fetch(variables.API_URL + 'auth/user')
      if (!response.ok) throw new Error(response.statusText)
      
      const data = await response.json();
      if(data.success == false) throw new Error(data.error)
      
      setUser(data.data)
    }
    catch (err) {
      setUser(null);
      console.log(err)
    }
  }
	
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
		
		
		checkAunthentication()
		setpageEnabled(allPages)
	}

	const [productId, setId] =
	useState({
		'id': -1
	});

	function getId(id) {
		function reset() {
			let prodId = productId

			setId(prodId)
			return prodId
		}

		let prodId = reset()
		prodId['id'] = id

		setId(prodId)
	}

	return (
		<div>
			{user != null ?
				<>
					{pageEnabled['MainPage'] ? <GetUserRole getId={id => getId(id)} handlePageChange={name => changeActiveWindow(name)} user={user} /> : null}
					{pageEnabled['ProductPage'] ? <Product handlePageChange={name => changeActiveWindow(name)} productid={productId.id}/> : null}
				</>
				: "Please Log in"
			}
		</div>
	);
}

function GetUserRole({ getId, handlePageChange, user }) {
	if (user.role === 'buyer') {
		return <UserProfile getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} user={user.info} />;
	}
	else if (user.role === 'seller') {
		return <SellerProfile getId={id => getId(id)} handlePageChange={name => handlePageChange(name)} user={user.info} />;
	}
	else
		return <div></div>
}

