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
            platform: null,
            posts: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleAccept(e) {

    }

    handleChange(e) {
        const {value} = e.target;
        this.setState({
            platform: value
        });
        const id = localStorage.getItem('PostID');
        const accountRef = firebase.database().ref('posts/' + id + "/Applicants/" + this.state.platform);
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
    };

    render() {
        return (
            <div>
                <div id={'applications-block'}>
                    <h2 className={'mt-4'}>Applications</h2>
                    <div className={'bg-white w-100 d-flex'}>
                        <div className={'plat-sel'}>
                            <div>
                                <input type="radio" id="option1" value={'Facebook'} onClick={this.handleChange}
                                       name={'platform'}/>
                                <label htmlFor="Choice1">Facebook</label>
                            </div>
                            <div>
                                <input type="radio" id="option2" value={'Instagram'}
                                       onClick={this.handleChange} name={'platform'}/>
                                <label htmlFor="Choice2">Instagram</label>
                            </div>
                            <div>
                                <input type="radio" id="option3" value={'LinkedIn'}
                                       onClick={this.handleChange} name={'platform'}/>
                                <label htmlFor="Choice3">LinkedIn</label>
                            </div>
                            <div>
                                <input type="radio" id="option4" value={'Twitter'}
                                       onClick={this.handleChange} name={'platform'}/>
                                <label htmlFor="Choice4">Twitter</label>
                            </div>
                            <div>
                                <input type="radio" id="option5" value={'Youtube'}
                                       onClick={this.handleChange} name={'platform'}/>
                                <label htmlFor="Choice5">Youtube</label>
                            </div>
                        </div>
                        <ul className={'ul2 w-100'}>
                            {this.state.posts.map(post =>
                                <Link to={`/post/${post.key}`} className={'text-decoration-none text-dark'}>
                                    <div className={'clickMe mb-3'} key={post.key} id={post.key}>
                                        <div className="d-flex p-3 bg-white d2">
                                            <div className={"w-100 d-flex div4"}>
                                                <h6 className="font-weight-bold br">{post.Name}</h6>
                                                <div>
                                                    <Button className={'btn btn-success rounded btn1'}
                                                            onClick={this.handleAccept}>Accept</Button>
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
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationCard;