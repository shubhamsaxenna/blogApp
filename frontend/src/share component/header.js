import './share.css'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { MdLogout } from "react-icons/md";
import { useHistory } from 'react-router-dom';

function Header(props){
    const [currentMenu, setCurrentMenu] = useState("")

    const {userDetails} = props
    const history = useHistory();
    
    const logout = ()=>{
        props.logout_User({});
        history.push("/signin");
    }
    return(
        <div className="header-bg">
            <div className="row">
                <div className="col-3">
                    <h2>BlogSpot</h2>
                </div>
                
                <div className="col-6 d-flex justify-content-center align-items-center">
                { userDetails.id != 'undefined' && userDetails.id != null ? <div>
                    <Link className="link me-2" to="/">All Blogs</Link>
                    <Link className="link" to="profile">Profile</Link>
                </div> : null}
                    
                </div>
                <div className="col-3 d-flex justify-content-end">
                { userDetails.id != 'undefined' && userDetails.id != null ? <div className='d-flex align-items-center'>
                    <p className='mb-0'>Hello, {userDetails.firstname} {userDetails.lastname}</p>
                    <IconButton className='ms-4' onClick={logout}><MdLogout/></IconButton>
                </div> : 
                <div className='d-flex align-items-center'>
                    <Link className="link" to="signup">SignUp</Link>
                    <span className="mx-1">/</span>
                    <Link className="link" to="signin">SignIn</Link>
                </div>}
                
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state =>{
    return{
        userDetails : state.user
    }
}

const mapDispatchToProps = dispatch => ({
    logout_User : payload => dispatch({ type: 'DELETE_AUTH', payload })
})


export default connect(mapStateToProps, mapDispatchToProps)(Header)