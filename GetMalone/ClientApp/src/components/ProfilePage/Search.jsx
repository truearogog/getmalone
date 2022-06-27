import React, { useState } from 'react'
import searchIcon from '../../images/icons/search.svg'
import styled from 'styled-components'

export function Search({ handleSearchClick = () => {} }) {
	const [name, setName] = useState('')

	function handleEnter(key) {
		if (key === 'Enter')
			handleSearchClick(name)
	}

	return (
		<Container>
			<Input
				placeholder={'Search for a product name...'} value={name} maxLength='25'
				onChange={e => setName(e.target.value)}
				onKeyDown={(e) => handleEnter(e.key)}
			></Input>
			<Icon onClick={() => handleSearchClick(name)} src={searchIcon} alt="" />
		</Container>
	)
}

const Container = styled.div`
	position:relative;
	width: 20rem;
	height: 48px;
	
	padding: 12px;
	left: 90px;
	top: 58px;
	
	@media only screen and (max-width: 1330px) {
		left: 0;
	}
`

const Icon = styled.img`
	position:absolute;
	width:auto;
	height:50%;
	top: calc(25% + 2px);
	right: 5px;
	margin:0 0 0 3%;
	opacity:0.63;
	
	cursor: pointer;
`

const Input = styled.input`
	width:100%;
	height:100%;
	margin:0;
	padding-left: 10px;
	color:#111517;
	letter-spacing:1px;
	font-weight:300;
	font-size:18px;
	border-radius:7px;
	box-shadow: none!important;
	border: 1px solid rgba(0,0,0,.1);
	
	@media only screen and (max-width: 1050px) {
		font-size:14px;
	}
`