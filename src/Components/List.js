import React from "react";
import styled from "styled-components";
import Item from "./items/items";

const Wrapper = styled.div`
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 10vh;
  width: 100%;
`;

class List extends React.Component {
  state = {
    data: ['asd'],
    Language: ['asd','bsd'],
  };

  componentDidMount() {
    fetch("http://localhost:8080/Cars")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
        console.log(data);
        
      });
  }
  handleCheck = () => {

    console.log(this.state.data.content[0].id);

  }
  

  render() {
    return (
      <Wrapper>
        <ListWrapper>

            <button onClick={this.handleCheck}>check</button>
          <Item primary></Item>
          
          <Item primary />
          <Item />
          <Item primary />
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default List;
