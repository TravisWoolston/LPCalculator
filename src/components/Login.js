import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import "../index.css";
import Stack from "@mui/material/Stack";
import App from "../App";
import createUser from "../operations/createUser";
import fetchUsers from "../operations/fetchUsers";
import SignUp from "./SignUp";
const Login = (props) => {
  const [isLoggedIn, setLogged] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [inputUser, setUser] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    balance: "",
  });
  const [inputPass, setPass] = useState("");
  const [error, setError] = useState(false);
  const signIn = async () => {
    const users = await fetchUsers();
    const findUser = users.find(
      (k) => k?.name === inputUser && k?.password === inputPass
    );
    console.log(findUser);
    if (findUser?.password === inputPass) {
      setUserData(findUser);
      console.log("Logging in user: ", findUser);
    }
    return findUser?.password === inputPass
      ? setLogged(true)
      : setNewUser(true);
  };
  const toggleNewUser = () => {
    setNewUser(true);
  };
  const createNewUser = async () => {
    const users = await fetchUsers();
    const findUser = users.find((k) => k.name === inputUser);
    console.log(findUser);
    setNewUser(false);
    setError(false);
    const result = findUser
      ? setError(true)
      : await createUser(inputUser, inputPass);
    if (!findUser) {
      setUserData({
        name: inputUser,
        password: inputPass,
        balance: 20,
      });
      setLogged(true);
    }
    return result;
  };
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  return (
    <>
      {!newUser ? (
        !isLoggedIn ? (
          <Grid style={{ width: "500px" }}>
            <Paper elevation={10}>
              <Grid align="center">
                <h2>{props.promptName}</h2>
              </Grid>
              <Stack style={{ width: "50%" }}>
                <TextField
                  style={{ left: "50%" }}
                  label="Username"
                  placeholder="Enter username"
                  variant="outlined"
                  value={inputUser}
                  onChange={handleUserChange}
                />
                <TextField
                  style={{ left: "50%" }}
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  variant="outlined"
                  value={inputPass}
                  onChange={handlePassChange}
                />
              </Stack>
              <Button
                style={{ left: "40%", margin: "8px 0" }}
                onClick={
                  props.promptName === "Sign Up" ? createNewUser : signIn
                }
                type="submit"
                color="primary"
                variant="contained"
              >
                {props.promptName}
              </Button>
              {props.promptName === "Login" ? (
                <Typography>
                  {" "}
                  Don't have an account?
                  <Link href="#">
                    <Button
                      style={{ left: "5%", margin: "8px 0" }}
                      className="signUp"
                      variant="contained"
                      color="primary"
                      onClick={toggleNewUser}
                    >
                      Signup
                    </Button>
                  </Link>
                </Typography>
              ) : null}
              <div>{error ? "Username already exists." : null}</div>
            </Paper>
          </Grid>
        ) : (
          <App userData={userData} setLogged={setLogged} />
        )
      ) : (
        <SignUp />
      )}
    </>
  );
};

export default Login;
