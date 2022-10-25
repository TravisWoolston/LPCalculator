import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import btnValues from "./constants/btnValues"
import React, { useState, useEffect } from "react";
import equals from "./operations/equals";
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { listUsers } from "./graphql/queries";
import awsExports from "./aws-exports";
import Login from "./components/Login";
Amplify.configure(awsExports);

const App = () => {
  const [isLoggedIn, setLogged] = useState(false)
  const [users, setUsers] = useState([])
  // console.log('theme', this.theme)
  const fetchUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers))
      const users = userData.data.listUsers.items
      setUsers(users)
    } catch (err) {
      console.log('error requesting users')
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  console.log('users', users)
  let screenVal = 0;
  const [display, setDisplay] = useState(0);
  const clickHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML; 
    const isNum = !isNaN(input);
    switch(true) {
      case input == "rnd":
        setDisplay(`${Math.random()}`)
        return
      case input == "√":
        setDisplay(`${Math.sqrt(Number(display))}`)
        return
      case isNum:
        setDisplay(display == 0 ? input : `${display}${input}`)
        return
      case input == "C":
        setDisplay(0)
        return
      case !isNum && input !== "=": 
        setDisplay(`${display} ${input} `) 
        return
      case input == "=":
        console.log('equals return', equals(display.split(" ")))
        setDisplay(equals(display.split(" ")))
        return
        
    }
  }
useEffect(() => {
  screenVal = display;
}, [])
  return (
    <>
    <Wrapper>
      <Screen value={display} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={clickHandler}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
    </>
  );
};

export default App;
