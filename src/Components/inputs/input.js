import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`

    width: 100%;
    height: 40px;
`;

const InputText = styled.input`

    width: 50%;
    font-size: 16px;
    padding: 5px 5px 5px 5px;
    color: #0e9aa4;

`;

const Label = styled.label`

    font-size: 20px;
    padding: 5px 5px 5px 5px;
    color: #0e9aa4;

`;


const Input = (props) =>{


    return(<InputWrapper>
        <Label>{props.content}</Label>
        <InputText type={props.type ? 'number' : 'text'} name={props.name} value={props.value} onChange={props.valueFn} required></InputText>
    </InputWrapper>)


}
    


export default Input;