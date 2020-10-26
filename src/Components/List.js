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
  top: -2vh;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 10% 10%;
  width: 97vw;
  position: relative;
  border-bottom: solid 1px #7a7a7a;
  opacity: 1;
  animation: show 1s;
  &:nth-child(2) {
    color: #0e9aa4;
    background-color: #1e1e1f;
  }
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
  margin-top: 10%;
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

const AddItem = styled.a`
  font-size: 20px;
  width: 60%;
  left: 40%;
  text-align: center;
  top: 10vh;
  position: relative;
  padding: 10px 20px 10px 20px;
  border: 3px solid #0e9aa4;
  color: #0e9aa4;
  background-color: #1e1e1f;
  font-weight: 700;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  width: 99vw;
  position: relative;
  height: 100px;
  background-color: #5f5f5f;
  margin: 0;
`;

const Search = styled.input`
  padding: 10px 10px 10px 10px;
  background-color: #1e1e1f;
  color: #0e9aa4;
  position: relative;
  width: 10vw;
  top: 2vh;
  left: 40vw;
  margin-left: 10px;
  font-size: 16px;
`;

const SearchLabel = styled.a`
  color: white;
  position: relative;
  left: 40vw;
  padding: 10px 10px 10px 10px;
  top: 2vh;
  background-color: #0e9aa4;
  border-radius: 5px;
  cursor: pointer;
`;

const OptionInput = styled.select`
  position: relative;
  left: 40vw;
  margin-left: 10px;
  background-color: #5f5f5f;
  color: #0e9aa4;
  top: 2vh;
  font-size: 15px;
`;

class List extends React.Component {
  state = {
    data: [],
    ready: "",
    refreshShoeList: true,
    Cars: {
      id: "",
      brand: "",
      model: "",
      color: "",
      type: "",
    },
    type: "color",
    value: "",
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

  Car = {
    id: "",
    brand: "",
    model: "",
    color: "",
  };

  handleModify = (e) => {
    this.setState({
      Cars: {
        id: e.id,
        brand: e.brand,
        model: e.model,
        color: e.color,
        type: "modify",
      },
    });
    this.Car.id = e.id;
  };

  changeItem = (e) => {
    this.Car[e.target.name] = e.target.value;
  };

  async UpdateFunction(e) {
    await fetch("http://localhost:8080/Cars", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.Car),
    });
    this.componentDidMount();
  }

  submitFunctionModify = (e) => {
    e.preventDefault();
    console.log(this.Car.id);
    this.UpdateFunction();
  };

  async AddFunction(e) {
    await fetch("http://localhost:8080/Cars", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.Car),
    });
    this.componentDidMount();
  }

  submitFunctionAdd = (e) => {
    e.preventDefault();
    console.log(this.Car.id);
    this.AddFunction();
  };

  AddItem = (e) => {
    this.setState({
      Cars: {
        id: 1,
        brand: "",
        model: "",
        color: "",
        type: "addItem",
      },
    });
  };

  getType = (e) => {
    this.setState({
      type: e.target.value,
    });
  };
  getValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  DataSet = {
    type: "",
    value: "",
  };

  ContentSet = () => {
    this.DataSet.value = this.state.value;
    this.setState({
      ready: "",
    });

    if (this.state.type === "color") {
      this.ContentColorFind(this.DataSet);
    } else {
      this.findById();
    }
  };

  async findById() {
    const getData = await fetch(
      "http://localhost:8080/Cars/" + this.DataSet.value
    ).then((response) => response.json());
    this.setState({
      data: getData,
    });
  }

  async ContentColorFind(dataProps) {
    const getData = await fetch(
      "http://localhost:8080/Cars/color/" + dataProps.value
    ).then((response) => response.json());
    if (getData) {
      this.setState({
        data: getData,
        ready: 'yes',
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <SearchWrapper>
          <SearchLabel onClick={this.ContentSet}>Wyszukaj</SearchLabel>
          <Search
            onChange={(e) => this.getValue(e)}
            type={this.state.type === "color" ? "text" : "number"}
            placeholder={this.state.type}
          ></Search>
          <OptionInput onChange={(e) => this.getType(e)}>
            <option value="color">color</option>
            <option value="id">id</option>
          </OptionInput>
        </SearchWrapper>

        <ListWrapper>
          <Item key="id" value="#Id" />
          <Item key="brand" value="#Brand" />
          <Item key="model" value="#Model" />
          <Item key="color" value="#Color" />
          <Item key="delete" value="#delete" />
          <Item key="modify" value="#modify" />
        </ListWrapper>
        {this.state.ready === "yes" ? (
          this.state.data.content.map((dane) => (
            <ListWrapper key={dane.id}>
              <Item strong value={dane.id} />
              <Item value={dane.brand} />
              <Item value={dane.model} />
              <Item value={dane.color} />
              <Button
                value={dane.id}
                onClick={(e) => this.handleDelete(dane.id)}
              >
                delete
              </Button>
              <Button onClick={(e) => this.handleModify(dane)}>modify</Button>
            </ListWrapper>
          ))
        ) : (
          <ListWrapper key={this.state.data.id}>
            <Item strong value={this.state.data.id} />
            <Item value={this.state.data.brand} />
            <Item value={this.state.data.model} />
            <Item value={this.state.data.color} />
            <Button
              value={this.state.data.id}
              onClick={(e) => this.handleDelete(this.state.data.id)}
            >
              delete
            </Button>
            <Button onClick={(e) => this.handleModify(this.state.data)}>
              modify
            </Button>
          </ListWrapper>
        )}
        <AddItem onClick={this.AddItem}>Dodaj Nowy Samochód</AddItem>
        {this.state.Cars.id ? (
          <Form>
            <FromHeader>{this.state.Cars.type}</FromHeader>
            <Input
              content="#Id"
              name="id"
              type="number"
              valueFn={this.changeItem}
              value={
                this.state.Cars.type === "modify" ? this.state.Cars.id : null
              }
            />
            <Input content="#Brand" name="brand" valueFn={this.changeItem} />
            <Input content="#Model" name="model" valueFn={this.changeItem} />
            <Input content="#Color" name="color" valueFn={this.changeItem} />
            <FormButton
              type="submit"
              onClick={
                this.state.Cars.type === "modify"
                  ? (e) => this.submitFunctionModify(e)
                  : (e) => this.submitFunctionAdd(e)
              }
            >
              {this.state.Cars.type === "modify" ? 'modify' : 'addNewCar'}
            </FormButton>
          </Form>
        ) : null}
      </Wrapper>
    );
  }
}

export default List;
