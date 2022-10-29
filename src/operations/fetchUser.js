import { Amplify, API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";

const fetchUser = async (name, password) => {
  const userData = {
    name,
    password,
  };
  console.log(userData);
  await API.graphql(graphqlOperation(getUser, { input: userData }))
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(`error fetching user: ${JSON.stringify(err)}`);
    });
};

export default fetchUser;
