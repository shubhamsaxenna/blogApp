import { useState } from 'react';
import { connect } from 'react-redux';
import secureAxious from "../axios/server"

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@mui/material/Snackbar';

import './auth.scss'

function SignIn(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showError, setError] = useState(false)

    const [showAlert, setShowAlert] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim().length && !password.trim().length) {
            setError(true)
        }

        secureAxious({
            method:'post',
            url:'user/',
            data:{"email":email, "password":password}
        }).then(response => {
            if(response.status == 200){
                props.authSuccess(response.data)
                props.history.push('/')
            }
        }).catch(err =>{
            setShowAlert(true);
         })
    }

    return (
        <div className="cardcenter">
            <div>
                {/* {showError && <Alert severity="error" className="mb-2" onClose={() => { setError(false) }}>
                    <AlertTitle className="mb-0">Error</AlertTitle>
                    Please check <strong>email</strong> and <strong>password.</strong>
                </Alert>
                } */}

                <Card variant="outlined" className="SignIncard">
                    <CardContent>
                        <p>Welcome, Please enter your details to Sign In.</p>
                        <form onSubmit={handleSubmit} className="pt-2 inputfields">
                            <div>
                                <p className="mb-1">Email:</p>
                                <TextField type="text" variant="outlined" name="email" className="fullwidth" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <p className="mb-1">Password:</p>
                                <TextField type="password" variant="outlined" name="password" className="fullwidth" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <Button type="submit" className="fullwidth bg-color mt-5" variant="contained">Sign In</Button>
                        </form>
                    </CardContent>
                </Card>

                <Snackbar
                    anchorOrigin={{ vertical : 'top', horizontal :'right' }}
                    open={showAlert}
                    onClose={()=> setShowAlert(false)}
                    autoHideDuration={3000}
                >
                    <Alert severity="error" onClose={()=> setShowAlert(false)} sx={{ width: '100%' }}>
                        Please check username and password.
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    authSuccess: payload => {
        dispatch({ type: 'AUTH_SUCCESS', payload })
    }
})

export default connect(null, mapDispatchToProps)(SignIn)