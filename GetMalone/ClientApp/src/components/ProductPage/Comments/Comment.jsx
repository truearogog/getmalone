import React from 'react';
import styled from 'styled-components'

export function Comment({ data }) {
	console.log(data)
	return (
		<CommentWrapper>	
			<ProfileHeader>
				<User>{data.buyer?.user.name} {data.buyer?.user.surname}</User>
				<Time>commented on {data?.created.substring(0, data.created.indexOf('T'))} {data?.created.substring(data.created.indexOf('T') + 1, data?.created.indexOf('T') + 6)}</Time>
				<Image src={data?.buyer.user.imageUrl} />
			</ProfileHeader>
			
			<CommentField><p>"{data.body}"</p></CommentField>
		</CommentWrapper>
	);
}

const CommentWrapper = styled.div`
	display: flex;
	margin: 0 auto;
	width: 60%;
	position: relative;
	padding-top: 40px;
`;

const ProfileHeader = styled.div`
	display: flex;
	justify-content: start;
	flex-direction: column;
`;

const User = styled.div`
	flex-direction: row;
	font-weight: 600;
	font-size: 20px;
	padding-bottom: 10px;
	white-space: pre;
`;

const Time = styled.span`
	position: absolute;
	top: 45px;
	left: 15%;
	flex-direction: row;
	font-weight: 400;
	font-size: 15px;
	padding-left: 40px;
`;

const Image = styled.img`
	object-fit: cover;
	width: 70px;
	height: 70px;
	margin-left: 0px;
	border-radius: 50%;
`;

const CommentField = styled.div`
	padding: 20px 60px;
	p{
		white-space: pre-line;
		text-align: left;
	}
`;