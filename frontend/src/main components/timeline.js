import { Component } from "react"
import secureAxious from "../axios/server"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Moment from 'moment';
import {MdOutlineSentimentDissatisfied} from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import './timeline.css'
import { connect } from "react-redux";
import AddBlogs from "./addBlogs";

class Timeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            addBlog : false
        };
    }

    componentDidMount() {
        const {auth} = this.props;
        
        if(Object.keys(auth).length){
            secureAxious('allblogs/').then(response => {
                this.setState({ blogs: response.data})
            }).catch(error => {
                // console.log(error)
            })
        }
        else{
            this.props.history.push('/signin')
        }
    }

    likeBlogs(value, index) {
        secureAxious({
            method:'PUT',
            url:'likeblogs/',
            data : {
                'id':value.id,
                'like':1
            }
        }).then(response => {
            this.setState(({blogs})=>({blogs: [...blogs.slice(0,index),{ ...blogs[index], likes: response.data.likes},...blogs.slice(index+1)]}))
        }).catch(error => {
            // console.log(error)
        })
    }

    render() {
        return (
            <div className="container ps-0 pt-5">
                {/* <Button variant="contained" className="float-end mb-5" onClick={()=> this.setState({addBlog : true})}>Add a Blog</Button> */}
                <div className="w-100 d-flex">
                    <div className="col-9">
                    {this.state.blogs.map((item,index) => (
                        <Card className="mb-3">
                            <CardContent>
                                <div id={index}>
                                    <div>
                                        <p className="h2 mb-0">{item.subject}</p>
                                        <p>{item.content}</p>
                                    </div>
                                    <div>
                                        <p className="mb-0" style={{'fontSize':'12px'}}>{Moment(item.created_time).format("YYYY-MM-DD HH:mm")}</p>
                                    </div>
                                </div>
                            </CardContent>
                            {/* <hr className="my-0 mx-2"/>
                            <CardActions className="py-0 ps-3">
                                <p className='mb-0'>{item.likes}</p>
                                <Button className="ms-0" onClick={() => this.likeBlogs(item, index)}>Like</Button>
                            </CardActions> */}
                        </Card>
                    ))}

                    {this.state.blogs.length ? (<div></div>):(<div style={{'marginTop':'17%'}}>
                        <MdOutlineSentimentDissatisfied className="d-flex m-auto" style={{'width':'5rem', 'height' : '5rem'}}/>
                        <p className="h2 mb-0 text-center">No blogs found please create a blog</p>
                        </div>
                    )}
                    </div>
                    
                    <div className="col-3 px-2">
                        <div className="userList shadow-sm">
                            <p className="h6">New Users</p>
                            <div style={{'marginTop':'5rem'}}>
                            <MdOutlineSentimentDissatisfied className="d-flex m-auto" style={{'width':'3rem', 'height' : '3rem'}}/>
                            <p className="text-center">No user join yet.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.addBlog} onClose={ () => this.setState({addBlog : false})}>
                    <DialogContent style={{width: '30vw'}}>
                        <AddBlogs dialog={()=> this.setState({addBlog : false})}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth : state.user
    }
}

export default connect(mapStateToProps)(Timeline)