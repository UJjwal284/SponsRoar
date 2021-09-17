import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from 'firebase';
import './ApplicationCard.css'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class ApplicationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const id = localStorage.getItem('PostID');
        const accountRef = firebase.database().ref('posts/' + id + "/Applicants/Youtube");
        accountRef.on('value', (snapshot) => {
                let accounts = snapshot.val();
                let newState = [];
                for (let account in accounts) {
                    console.log(account)
                    firebase.database().ref('sponsee/' + account).on('value', (snap) => {
                        let acc = snap.val();
                        console.log(acc)
                        newState.push({
                            key: acc,
                            Email: acc.Email,
                            Name: acc.Name,
                        })
                    })
                }
                this.setState({
                    posts: newState,
                })
            }
        )
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post =>
                    <Link to={`/post/${post.key}`} className={'text-decoration-none text-dark'}>
                        <div className={'clickMe mb-3'} key={post.key} id={post.key}>
                            <div className="d-flex p-3 bg-white d2">
                                <div className={"w-100 d-flex div4"}>
                                    <h6 className="font-weight-bold br">{post.Name}</h6>
                                    <div>
                                        <Button className={'btn btn-success rounded btn1'}>Accept</Button>
                                        <Button className={'btn btn-danger rounded btn1'}>Reject</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex px-4 py-2 bg-lightgrey">
                                <p className="my-auto ti text-black-50" id={'ppp'}>{post.Email}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default ApplicationCard;