import React from 'react';
import styled from 'styled-components'

export function ProfileData({ data }) {
	//console.log(data)
	return (
		<ProfileDataWrapper>

			<ProfileLogo>
				<Image src={require('../../images/profile-pictures/users/0.png')} />
				<Rating data={data.rating} />
			</ProfileLogo>
			<ProfileInfo>
				<Name user={data}/>
				<Info info={data}/>
			</ProfileInfo>

		</ProfileDataWrapper>
	)
}

function Rating({ data }) {
	if (typeof data !=='undefined')
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
			<p>phone: {info.phone}</p>
			<p>mail: {info.email}</p>
			<Interests data={info.interests}/>
			<Certificates data={info.sertificateCodes}/>
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
  	width: 250px;
	height: 250px;
	padding-top: 40px;
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
`;
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