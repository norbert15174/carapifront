import React from 'react';
import styled from 'styled-components';

const LiItem = styled.li`
    width: 100%;
    text-align: center;
    list-style: none;
    padding: 10px 10px 10px 10px;
    font-size: 20px;
    font-weight: ${props => props.strong ? '700' : '300'};
`;


const Item = (props) =>{
    return(
    <LiItem primary={props.primary} strong={props.strong}>{props.value}</LiItem>
    

    )
}

export default Item;