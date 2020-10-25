import React from 'react';
import styled from 'styled-components';

const LiItem = styled.li`
    width: 100%;
    height: 5vh;
    text-align: center;
    list-style: none;
    border: 1px solid black;
    background-color: ${props => props.primary ? 'grey' : 'white'};
    
`;


const Item = (props) =>{
    return(
    <LiItem primary={props.primary}></LiItem>

    )
}

export default Item;