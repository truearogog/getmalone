import React from 'react';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

const id = 0;

export function UserProfile() {
	return (
		<Container>

			<ProfileData>
				<ProfileLogo>
					<Image src={require('../images/profile-pictures/users/'+id+'.png')} />
				</ProfileLogo>
				<ProfileInfo>
					info
					tel.
					e-mail
				</ProfileInfo>
			</ProfileData>

			<RecommendedProducts>
				<ListTitle>
					Recommended products
				</ListTitle>
				<ProductList>
					<ProductItem />
				</ProductList>
			</RecommendedProducts>

		</Container>	
	);
}

const Container = styled.div`
  	width: 60%;
	margin: 0 auto;
	background: rgba(255, 0, 0, 0.8);
`;
const ProfileData = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	background: rgba(0, 0, 255, 0.8);
`;
const ProfileLogo = styled.div`
  	width: 40%;
	background: rgba(0, 255, 0, 0.8);
`;
const Image = styled.img`
  	width: 250px;
	height: 250px;
	margin: 0 auto;
`;
const ProfileInfo = styled.div`
  	width: 60%;
	background: rgba(100, 100, 100, 0.8);
`;
const RecommendedProducts = styled.div`
	background: rgba(100, 100, 100, 0.8);
`;
const ListTitle = styled.div`
	background: rgba(100, 100, 100, 0.8);
`;
const ProductList = styled.div`
	background: rgba(100, 100, 100, 0.8);
`;
const ProductItem = styled.div`
	background: rgba(100, 100, 100, 0.8);
`;
