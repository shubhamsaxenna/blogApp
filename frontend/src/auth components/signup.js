import { useState } from 'react';
import secureAxious from "../axios/server"

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


function SignUp(props) {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [termcondition , setTermCondition] = useState(false)

    const [firstnameError, setFirstNameError] = useState(false)
    const [lastnameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [userRegistered, setUserRegistered] = useState(false)

    function checkError(value){
        if( value == "firstname"){
            if (!firstname.trim().length) {
                setFirstNameError(true)
            } else {
                setFirstNameError(false)
            }
        }

        if( value =="lastname"){
            if (!lastname.trim().length) {
                setLastNameError(true)
            } else {
                setLastNameError(false)
            }
        }

        if(value == "email"){
            if (!email.trim().length) {
                setEmailError(true)
            } else {
                setEmailError(false)
            }
    
        }

        if(value == "password"){        
            console.log(password == confirmpassword)
            // console.log(confirmpassword)
            if (!password.trim().length) {
            setPasswordError(true)
            }else{
                setPasswordError(false)
            }
        }
        else if(value == "confirmpassword"){
            if (!confirmpassword.trim().length || (password.trim() != confirmpassword.trim())) {
                setConfirmPasswordError(true)
            } else {
                setConfirmPasswordError(false)
            }
        }
    } 
        
    

    const handleSubmit = () => {
        if(password == confirmpassword && password.length && confirmpassword.length){
            addUser();
        }
    }

    function addUser() {
        secureAxious({
            method:'post',
            url:'user/',
            data:{"firstname":firstname, "lastname":lastname, "email":email, "password":password}
        }).then(response => {
            setUserRegistered(true);
            // props.history.push('/signin')
            // this.setState({ blogs: response.data})
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="cardcenter">
            <Card variant="outlined" className="SignUpcard">
                <CardContent>
                    <p>Welcome, Please fill the form.</p>
                    <form className="pt-2 inputfields">
                        <div className="row">
                            <div className="col-6">
                                <p className="mb-1">First Name</p>
                                <TextField type="text" variant="outlined" className="fullwidth" onChange={(e) => {setFirstName(e.target.value); checkError("firstname")}} />
                                {firstnameError && <span className="inputerror">*Please check the name</span>}
                            </div>
                            <div className="col-6">
                                <p className="mb-1">Last Name</p>
                                <TextField type="text" variant="outlined" className="fullwidth" onChange={(e) => {setLastName(e.target.value); checkError("lastname")}} />
                                {lastnameError && <span className="inputerror">*Please check the name</span>}
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <p className="mb-1">Email</p>
                            <TextField type="email" variant="outlined" className="fullwidth" onChange={(e) => {setEmail(e.target.value); checkError("email")}} />
                            {emailError && <span className="inputerror">*Please check the email</span>}
                        </div>
                        <div className="col-12 mt-2">
                            <p className="mb-1">Password</p>
                            <TextField type="text" variant="outlined" className="fullwidth" onChange={(e) => {setPassword(e.target.value); checkError("password")}} />
                            {passwordError && <span className="inputerror">*Password can not be empty.</span>}
                        </div>
                        <div className="col-12 mt-2">
                            <p className="mb-1">Confirm Password</p>
                            <TextField type="text" variant="outlined" className="fullwidth" onChange={(e) => {setConfirmPassword(e.target.value); checkError("confirmpassword") }} />
                            {confirmPasswordError && <span className="inputerror">*Password not match</span>}
                        </div>
                        <div className="checkbox d-flex align-items-center">
                            <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} checked={termcondition} onChange={() => setTermCondition(!termcondition)}/>
                            <span>I accept the Terms and conditions.</span>
                        </div>
                        <Button className="fullwidth bg-color mt-2" disabled={!termcondition} onClick={handleSubmit} variant="contained">Sign In</Button>
                    </form>
                </CardContent>
            </Card>
            
            <Dialog open={userRegistered} onClose={ () => setUserRegistered(false)}>
                <DialogContent className="pb-2"> You successfully registered with us. Click below to go to Sign In.</DialogContent>
                <DialogActions className="d-flex justify-content-center pb-3"><button onClick={ ()=> props.history.push('/signin') }>Sign In</button></DialogActions>
            </Dialog>
        </div>
    )
}

export default SignUp