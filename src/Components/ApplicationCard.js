import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from 'firebase';
import './sponsorCard.css'
import {Link} from "react-router-dom";

class ApplicationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const id = localStorage.getItem('PostID');
        const accountRef = firebase.database().ref('posts/' + id + "/Applicants/Facebook");
        accountRef.on('value', (snapshot) => {
                let accounts = snapshot.val();
                let newState = [];
                for (let account in accounts) {
                    newState.push({
                        key: account,
                        Email: accounts[account].Email,
                        Name: accounts[account].Name,
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
                                <div className={" "}>
                                    <h6 className="text-primary font-weight-bold br">{post.Brand}</h6>
                                </div>
                                <img src="logo.png" height="130px" className="ml-auto m-3 pl-3"/>
                            </div>
                            <div className="d-flex px-4 py-2 bg-lightgrey">
                                <p className="my-auto ti text-black-50" id={'ppp'}>{post.CreatedOn}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default ApplicationCard;