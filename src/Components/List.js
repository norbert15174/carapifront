import React from "react";
import styled from "styled-components";
import Item from "./items/items";
import Input from "./inputs/input";
const Wrapper = styled.div`
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const ListWrapper = styled.ul`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 10% 10%;
  width: 90%;
  position: relative;
  left: 5%;
  border-bottom: solid 1px #7a7a7a;
  &:nth-child(1) {
    color: #0e9aa4;
    background-color: #1e1e1f;
  }
`;

const Button = styled.a`
  color: #0e9aa4;
  border: none;
  background: none;
  font-size: 15px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  padding-bottom: 5px;
  text-align: center;
`;

const Form = styled.form`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
`;

const FormButton = styled.button`

    background-color: white;
    color: #0e9aa4;
    font-size: 16px;
    padding: 10px 10px 10px 10px;

`;

const FromHeader = styled.h1`

  color: #0e9aa4;

`;

class List extends React.Component {
  state = {
    data: [],
    ready: "",
    refreshShoeList: true,
    Cars: {
      id: '',
      brand: '',
      model: '',
      color: ''
  }
  };

  dane = {
    data: [],
  };

  


  async componentDidMount() {
    const getData = await fetch("http://localhost:8080/Cars").then((response) =>
      response.json()
    );
    this.setState({
      ready: "",
    });
    if (getData) {
      this.setState({
        data: getData,
        ready: "yes",
      });
    }
  }

  async deleteFunction(e) {
    await fetch("http://localhost:8080/Cars/" + e, {
      method: "delete",
    });
    this.componentDidMount();
  }

  handleDelete = (e) => {
    this.deleteFunction(e);
  };

  handleModify = (e) => {
      this.setState({
        Cars: {
          id: e.id,
          brand: e.brand,
          model: e.model,
          color: e.color,
        },
      })
  };

  Car = {
      id: 10,
      brand: 'x5',
      model: 'x7',
      color: 'sad'
  }

  addItem = (e) => {
      this.Car = {[e.target.name]: e.target.value}
  }

  submitFunction = (e) =>{

    const formData = new FormData();
    formData.append('id',4);
    formData.append('brand','asd');
    formData.append('model','csd');
    formData.append('color','dsf');

    e.preventDefault();
    fetch("http://localhost:8080/Cars",{
      method: "post",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(this.Car)
    })
  }
  

  render() {
    return (
      <Wrapper>
        <ListWrapper>
          <Item key="id" value="#Id" />
          <Item key="brand" value="#Brand" />
          <Item key="model" value="#Model" />
          <Item key="color" value="#Color" />
          <Item key="delete" value="#delete" />
          <Item key="modify" value="#modify" />
        </ListWrapper>
        {this.state.ready === "yes"
          ? this.state.data.content.map((dane) => (
              <ListWrapper key={dane.id}>
                <Item strong value={dane.id} />
                <Item value={dane.brand} />
                <Item value={dane.model} />
                <Item value={dane.color} />
                <Button value={dane.id} onClick={(e) => this.handleDelete(dane.id)}>
                  delete
                </Button>
                <Button onClick={(e) => this.handleModify(dane)}>modify</Button>
              </ListWrapper>
            ))
          : null}
        
        {this.state.Cars.id ? <Form>
        <FromHeader>Modify</FromHeader>
          <Input content="#Id" name="id" value={this.state.Cars.id}/>
          <Input content="#Brand" name="brand" valueFn={this.addItem}/>
          <Input content="#Model" name="model" valueFn={this.addItem}/>
          <Input content="#Color"  name="color" valueFn={this.addItem}/>
          <FormButton type="submit" onClick={e => this.submitFunction(e)}>modify</FormButton>
        </Form> : null }
      </Wrapper>
    );
  }
}

export default List;
