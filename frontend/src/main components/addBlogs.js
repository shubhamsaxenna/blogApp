
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import secureAxious from "../axios/server"
import IconButton from '@mui/material/IconButton';
import { MdClose } from "react-icons/md";

function AddBlogs(props){
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const date = new Date();
    console.log(props)
    const createBlog = () => {
        secureAxious({
            method:'POST',
            url : 'blogs/'+props.user.id,
            data : {
                'subject': subject,
                'content': content,
                'created_time' : date
            }
        }).then(response => {
            setShowAlert(true)
            props.dialog();
        }).catch(error => {
            // console.log(error)
        })
    }

    return(
        <div className="container">
            <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0' style={{'fontSize':'22px', 'fontWeight':'600'}} >Add Blog</p>
                <IconButton onClick={()=> props.dialog()}><MdClose/></IconButton>
            </div>
            <div className="col-12 mt-3">
                <label className='mb-2'>Subject</label>
                <TextField type="text" variant="outlined" className="fullwidth" onChange={(e) => setSubject(e.target.value)}/>
            </div>

            <div className="col-12 mt-3">
                <label className='mb-2'>Content</label>
                <TextField type="text" variant="outlined" className="fullwidth" onChange={(e) => setContent(e.target.value)}/>
            </div>

            <Button className='mt-3' variant="contained" onClick={createBlog}>Submit</Button>
            <Snackbar
                    anchorOrigin={{ vertical : 'top', horizontal :'right' }}
                    open={showAlert}
                    onClose={()=> setShowAlert(false)}
                    autoHideDuration={3000}
                >
                    <Alert severity="success" onClose={()=> setShowAlert(false)} sx={{ width: '100%' }}>
                        Please check username and password.
                    </Alert>
            </Snackbar>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(AddBlogs)