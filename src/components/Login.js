import React, {useState, useEffect} from 'react'
import { Grid,Paper, TextField, Button, Typography,Link } from '@material-ui/core'
import App from '../App';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Login=()=>{
    const btnstyle={margin:'8px 0'}
    const [isLoggedIn, setLogged] = useState(false)
    const signIn = () => {
        setLogged(true)
    }
    // useEffect(()=> {
    //     isLoggedIn
    // })
    return(
        <>
        {isLoggedIn ?<Grid>
            <Paper elevation={10} >
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <Button onClick= {signIn}type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                </Typography>
                <Typography > Don't have an account?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid> : <App />}
        </>
    )
}

export default Login