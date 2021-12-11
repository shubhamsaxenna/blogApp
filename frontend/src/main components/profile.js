import { useEffect, useState } from "react"
import { connect } from 'react-redux';
import secureAxious from "../axios/server"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddBlogs from "./addBlogs";
import {MdOutlineSentimentDissatisfied} from "react-icons/md";
import {MdDeleteOutline} from "react-icons/md";
import IconButton from '@mui/material/IconButton';


function Profile(props){
    const [userBlogs, setUserBlogs] = useState([])
    const [addBlog, setAddBlog] = useState(false)

    useEffect(()=>{
        secureAxious({
            method:'GET',
            url : 'blogs/'+props.user.id,
        }).then(response => {
            setUserBlogs(response.data)
        }).catch(error => {
            // console.log(error)
        })
    },[addBlog])

    const allBlogs = () =>{
        
    }


    const deleteBlog = (item, index) => {
        secureAxious({
            method:'DELETE',
            url : 'blogs/'+props.user.id,
            data:{
                'id': item.id
            }
        }).then(response => {
            setUserBlogs([...userBlogs.slice(0, index),...userBlogs.slice(index+1)])
        }).catch(error => {
        })
    }

    return(
        <div className="container pt-5">
            <div className="d-flex justify-content-end mt-1">
                <Button variant="contained" onClick={()=> setAddBlog(true)}>Add a Blog</Button>
            </div>
            <div className="col-12 mt-5">
                {userBlogs.map((item,index) => (
                    <Card className="mb-3">
                        <CardContent>
                            <div id={index}>
                                <div className="d-flex">
                                    <div className="col-11">
                                        <p className="h2 mb-0">{item.subject}</p>
                                        <p>{item.content}</p>
                                    </div>
                                    <div className="col-1 d-flex justify-content-end">
                                        <IconButton onClick={()=> deleteBlog(item, index)}><MdDeleteOutline/></IconButton>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-0" style={{'fontSize':'12px'}}>{Moment(item.created_time).format("YYYY-MM-DD HH:mm")}</p>
                                </div>
                            </div>
                        </CardContent>
                            {/* <hr className="my-0 mx-2"/>
                            <CardActions className="py-0 ps-3">
                                <p className='mb-0'>{item.likes}</p>
                                <Button className="ms-0" onClick={() => deleteBlog(item, index)}>Like</Button>
                            </CardActions> */}
                    </Card>
                ))}
            </div>

            {userBlogs.length ? null :(<div style={{'marginTop':'17%'}}>
                <MdOutlineSentimentDissatisfied className="d-flex m-auto" style={{'width':'5rem', 'height' : '5rem'}}/>
                <p className="h2 mb-0 text-center">No blogs found please create a blog</p>
                </div>
            )}
            <Dialog open={addBlog} onClose={ () => setAddBlog(false)}>
                <DialogContent style={{width: '30vw'}}>
                    <AddBlogs dialog={()=> setAddBlog(false)}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Profile)