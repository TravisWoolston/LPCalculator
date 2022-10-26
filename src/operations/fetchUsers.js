import { API, graphqlOperation } from 'aws-amplify'
import { listUsers } from "../graphql/queries";

const fetchUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers))
      const users = userData.data.listUsers.items
      return users
    } catch (err) {
      console.log('error requesting users')
    }
  }

  export default fetchUsers