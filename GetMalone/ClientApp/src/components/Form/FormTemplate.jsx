import styled from 'styled-components'

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 0 100px 50px 100px;
  background: #f3f3f3;
  text-align: center;
`

export const FormContainer = styled.form`
	padding-top: 60px;
	width: 50%;
	margin: 0 auto;
`;

export const FormTitle = styled.p`
	text-align: center;
	font-size: 30px;
`;

export const FormFields = styled.div`
	width: 55%;
	min-width: 250px;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export const FormItem = styled.input`
	width: 100%;
	font-size: 14px;
	margin-bottom: 15px;
	height: 35px;
	padding: 0 10px;
    box-shadow: none!important;
	border-radius: 4px;
    border: 1px solid rgba(0,0,0,.1);

	&.half {
		width: 42%;
	}

	&:focus {
		outline: none;
	}
`;

export const FormDropDown = styled.select`
	width: 100%;
	font-size: 14px;
    margin-top: 10px;
	margin-bottom: 15px;
	height: 35px;
	padding: 0 10px;
	box-shadow: none!important;
	border-radius: 4px;
	border: 1px solid rgba(0,0,0,.1);

	&:focus {
		outline: none;
	}

	option {
		height: 35px;
		padding: 0 10px;
	}
`;

export const FormButton= styled.button`
	width: 45%;
	min-width: 120px;
	margin: 0 auto;
	margin-top: 15px;
	height: 30px;
	border-radius: 4px;
	border: 1px solid #1089ff;
	background: #1089ff!important;
    color: #fff;
	transition: background .3s;
	
	&:hover {
		border: 1px solid #006fdc!important;
    	background: #006fdc!important;
		cursor: pointer;
	}
`;

export const BigFormButton= styled.button`
	width: 55%;
	min-width: 120px;
	margin: 0 auto;
	margin-top: 15px;
	height: 40px;
	border-radius: 4px;
	border: 1px solid #77dd77;
	background: #77dd77!important;
    color: #fff;
	transition: background .3s;
	
	&:hover {
		border: 1px solid #4ed34e!important;
    	background: #4ed34e!important;
		cursor: pointer;
	}
`;