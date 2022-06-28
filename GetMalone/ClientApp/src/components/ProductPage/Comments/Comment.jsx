import React from 'react';
import styled from 'styled-components'

export function Comment({ data }) {
	return (
		<>
			{console.log(data)}
			<p>{data?.created.substring(0, data.created.indexOf('T'))} {data?.created.substring(data.created.indexOf('T') + 1, data?.created.indexOf('T') + 6)}</p>
			<Image src={data?.buyer.user.imageUrl} />
			<p>{data?.buyer.user.name} 
			{data?.buyer.user.surname}</p>
			<p>{data.body}</p>
		</>
	);
}


const Image = styled.img`
	padding-top: 60px;
	object-fit: cover;
	width: 300px;
	height: 300px;
	margin: 0 auto;
	border-radius: 50%;
`;