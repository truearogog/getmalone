import React from 'react';
import styled from 'styled-components'

export function ProfileData(data) {
	return (
		<ProfileDataWrapper>

			<ProfileLogo>
				<Image src={require('../../images/profile-pictures/users/'+data.id+'.png')} />
			</ProfileLogo>
			<ProfileInfo>
				<Name user={data}/>
				<Info info={data}/>
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

function Name(user) {
	return (
		<NameWrapper>
			<p>{user.name} {user.surname}</p>
		</NameWrapper>
	)
}
const NameWrapper = styled.div`
	font-size: 35px;
	padding-top: 20px;
	padding-left: 80px;
	margin-bottom: -20px;
`;

function Info(info) {
	return (
		<InfoWrapper>
			<InfoTitle>
				Contacts:
			</InfoTitle>
			<p>phone: {info.phone}</p>
			<p>mail: {info.mail}</p>
      {/* <Interests data={info.interests}/>
      <Certificates data={info.sertificatecodes}/> */}
			
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

function Interests(data) {
  if (data)
    return (
      <>
        <InfoTitle>
          Interested in:
        </InfoTitle>
        <p>{data.interests}</p>
      </>
    )
}

function Certificates(data) {
  if (data)
    return (
      <>
        <InfoTitle>
          Interested in:
        </InfoTitle>
        <p>{data.sertificatecodes}</p>
      </>
    )
}