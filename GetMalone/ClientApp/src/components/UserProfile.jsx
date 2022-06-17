import React from 'react';
import styled from 'styled-components'
//import { variables } from '../variables';
//import { v4 as uuidv4 } from 'uuid';

const id = 0;

export function UserProfile() {
	return (
		<Container>

			<ProfileData />
			<RecommendedProducts />

		</Container>	
	);
}
const Container = styled.div`
  	width: 60%;
	margin: 0 auto;
	background: rgba(255, 0, 0, 0.8);
`;

function ProfileData() {
	return (
		<ProfileDataWrapper>

			<ProfileLogo>
				<Image src={require('../images/profile-pictures/users/'+id+'.png')} />
			</ProfileLogo>
			<ProfileInfo>
				<Name />
				<Info />
			</ProfileInfo>

		</ProfileDataWrapper>
	)
}
const ProfileDataWrapper = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	background: rgba(0, 0, 255, 0.8);
	padding-bottom: 100px;
`;
const ProfileLogo = styled.div`
  	width: 40%;
	background: rgba(0, 255, 0, 0.8);
	position: relative;
`;
const Image = styled.img`
  	width: 250px;
	height: 250px;
	margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;
const ProfileInfo = styled.div`
  	width: 60%;
	background: rgba(100, 100, 100, 0.8);
`;

function Name() {
	return (
		<NameWrapper>
			<p>John Smith</p>
		</NameWrapper>
	)
}
const NameWrapper = styled.div`
	font-size: 35px;
	padding-top: 20px;
	padding-left: 80px;
	margin-bottom: -20px;
`;

function Info() {
	return (
		<InfoWrapper>
			<InfoTitle>
				Contacts:
			</InfoTitle>
			<p>phone: 23456789</p>
			<p>mail: test@example.com</p>
			<InfoTitle>
				Interested in:
			</InfoTitle>
			<p>apples, bananas</p>
		</InfoWrapper>
	)
}
const InfoWrapper = styled.div`
	line-height: 10px;
	padding-left: 100px;
`;
const InfoTitle = styled.p`
	padding-top: 10px;
	font-size: 20px;
	margin-left: -20px;
	line-height: 15px;
	font-weight: 600;
`;

function RecommendedProducts() {
	return (
		<RecommendedProductsWrapper>
			<ListTitle>
				Recommended products
			</ListTitle>
			<ProductList>
				<ProductItem />
			</ProductList>
		</RecommendedProductsWrapper>
	)
}
const RecommendedProductsWrapper = styled.div`
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
