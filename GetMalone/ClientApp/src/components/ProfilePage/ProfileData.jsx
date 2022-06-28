import React from 'react';
import styled from 'styled-components'

export function ProfileData({ data }) {
	//console.log(data)
	return (
		<ProfileDataWrapper>

			<ProfileLogo>
				<Image src={data?.user?.imageUrl} />
				{/*<Rating data={data.rating} />*/}
			</ProfileLogo>
			<ProfileInfo>
				<Name user={data.user} />
				<Info info={data} />
			</ProfileInfo>

		</ProfileDataWrapper>
	)
}

function Rating({ data }) {
	if (typeof data !== 'undefined')
		return (
			<RatingWrapper>
				Rating: <span className="nr">{data}/5</span>
			</RatingWrapper>
		)
	else
		return <></>
}

function Name({ user }) {
	return (
		<NameWrapper>
			<p>{user.name} {user.surname}</p>
		</NameWrapper>
	)
}

function Info({ info }) {
	return (
		<InfoWrapper>
			<InfoTitle>
				Contacts:
			</InfoTitle>
			<p>phone: {info.user.phone}</p>
			<p>mail: {info.user.email}</p>
			<Interests data={info.interests} />
			<Certificates data={info.sertificateCodes} />
		</InfoWrapper>
	)
}

function Interests({ data }) {
	if (data)
		return (
			<>
				<InfoTitle>
					Interested in:
				</InfoTitle>
				<p>{data.join(', ')}</p>
			</>
		)
	else
		return <></>
}

function Certificates({ data }) {
	if (data)
		return (
			<>
				<InfoTitle>
					Certificates:
				</InfoTitle>
				<p>{data.join(', ')}</p>
			</>
		)
	else
		return <></>
}

//-------container---------------
const ProfileDataWrapper = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
`;

//-------left side---------------
const ProfileLogo = styled.div`
	width: 40%;
	text-align: center;
`;
const Image = styled.img`
	padding-top: 40px;
	border-radius: 50%;

	max-width: 100%;
  	width: 250px;
	height: 250px;

	@media (max-width: 1400px) {
		width: 200px;
		height: 200px;
	}
	@media (max-width: 1000px) {
		width: 150px;
		height: 150px;
	}
`;
const RatingWrapper = styled.p`
	font-size: 30px;
	.nr {
		font-weight: 600;
	}
`;

//-------right side---------------
const ProfileInfo = styled.div`
  width: 60%;
`;
const NameWrapper = styled.div`
	font-size: 35px;
	padding-top: 20px;
	padding-left: 80px;
	margin-bottom: -20px;

	@media (max-width: 1000px) {
		font-size: 30px;
	}
`;
const InfoWrapper = styled.div`
	line-height: 10px;
	padding-left: 100px;

	@media (max-width: 1000px) {
		font-size: 16px;
		p {
			line-height: 20px;
		}
	}
	
`;
const InfoTitle = styled.p`
	padding-top: 10px;
	font-size: 20px;
	margin-left: -20px;
	line-height: 15px;
	font-weight: 600;

	@media (max-width: 1000px) {
		font-size: 18px;
	}
`;