import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 15px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  width: 330px;
  height: 100px;
`;

const App = () => {
    return (
        // <h1>Hello World!</h1>
        <div>
            <Button>All applicants</Button>
            <Button>New candidates</Button>
            <Button>Invited for interview</Button>
            <Button>Waiting for Background Check</Button>
        </div>
    );
}

export default App;