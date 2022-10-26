/* eslint-disable no-unused-vars */
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import btnValues from "./constants/btnValues";
import React, { useState, useEffect } from "react";
import equals from "./operations/equals";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import putUser from "./operations/updateUser";
Amplify.configure(awsExports);

const App = (props) => {
  const [balance, setBalance] = useState(props.userData.balance);
  const [userData, setUserData] = useState(props.userData);
  // console.log('theme', this.theme)

  let screenVal = 0;
  const [display, setDisplay] = useState(0);
  const clickHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML;
    const isNum = !isNaN(input);
    switch (true) {
      case input === "rnd":
        setDisplay(`${Math.random()}`);
        return;
      case input === "√":
        setDisplay(`${Math.sqrt(Number(display))}`);
        return;
      case isNum || input ===".":
        setDisplay(display === 0 ? input : `${display}${input}`);
        return;
      case input === "C":
        setDisplay(0);
        return;
      case !isNum && input !== "=":
        setDisplay(`${display} ${input} `);
        return;
      case input === "=":
        if((balance - display.length / 2) < 0) {
          setDisplay('Insufficient funds!!!')
          return
        }
        console.log("equals return", equals(display.split(" ")));
        setBalance(balance - display.length / 2);
        setDisplay(equals(display.split(" ")));
        putUser(userData, balance - display.length / 2);
        return;
      default:
        return "";
    }
  };

  return (
    <>
      Balance: {balance}
      <Wrapper>
        <Screen value={display} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={clickHandler}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </>
  );
};

export default App;
