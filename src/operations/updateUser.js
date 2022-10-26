import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";

const putUser = async (userData, balance) => {
  await API.graphql(
    graphqlOperation(updateUser, {
      input: { id: userData.id, balance: balance },
    })
  )
    .then((response) => {
      console.log("putUser", response, balance);
    })
    .catch((err) => {
      console.log(`error updating user: ${JSON.stringify(err)}`);
    });
};

export default putUser;
