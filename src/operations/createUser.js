import {createUser} from '../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify';

const userCreate = async (name, password) => {
    const userData = {
        name,
        password,
        balance: 100
    }
    console.log(userData)
    await API.graphql(graphqlOperation(createUser, {input: userData}))
    .then(response=>{
        return response
    })
    .catch(err => {
        console.log(`error creating user: ${JSON.stringify(err)}`)
    })
}

export default userCreate;