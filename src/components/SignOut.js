import React from "react";
import { Button } from "@material-ui/core";

const SignOut = (props) => {
  return (
    <Button
      onClick={props.signOut}
      className="signOut"
      variant="contained"
      color="primary"
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
