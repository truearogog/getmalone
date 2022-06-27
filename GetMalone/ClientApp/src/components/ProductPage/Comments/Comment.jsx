import React from 'react';
import styled from 'styled-components'

export function Comment({ data }) {
	return (
		<>
			<p>{data.created}</p>
			{/*<p>{data.buyer.user.name} {data.buyer.user.surname}</p>*/}
			<p>{data.body}</p>
		</>
	);
}


