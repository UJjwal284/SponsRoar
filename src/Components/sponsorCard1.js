import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase, {db} from './Firebase';
import {Link} from "react-router-dom";

class SponsorCard1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const CURRENTUSER = localStorage.getItem('CURRENTUSER');
        let brand = "";
        db.ref("sponsor/" + CURRENTUSER).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            brand = childData['Name'];
        });
        firebase.database().ref('posts').on('value', (snapshot) => {
            let accounts = snapshot.val();
            let newState = [];
            for (let account in accounts) {
                if (accounts[account].Brand === brand) {
                    let plats = "";
                    firebase.database().ref('posts/' + account + '/Platform').on('value', (snap) => {
                        let acc = snap.val();
                        for (let accs in acc) {
                            plats += " " + accs + ',';
                        }
                    })
                    newState.push({
                        plat: plats.slice(0, -1),
                        key: account,
                        Brand: accounts[account].Brand,
                        Category: accounts[account].Category,
                        CreatedOn: new Date(accounts[account].CreatedOn).toLocaleString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        Description: accounts[account].Description,
                        ProductName: accounts[account].ProductName,
                    })
                }
            }
            this.setState({
                posts: newState,
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post =>
                    <Link to={`/post/${post.key}`} className={'text-decoration-none text-dark'}>
                        <div className={'clickMe mb-3'} key={post.key} id={post.key}>
                            <div className="d-flex p-3 bg-white">
                                <div className={"pr-3"}>
                                    <h6 className="text-primary font-weight-bold br">{post.Brand}</h6>
                                    <h4 className="font-weight-bold">{post.ProductName}</h4>
                                    <p className="mb-2 mr-4 de">{post.Description}</p>
                                    <div className="d-flex">
                                        <p className="w-50 m-0 cat"><b>Category:</b> {post.Category}</p>
                                        <p className="w-50 m-0"><b>Platform:</b> {post.plat}</p>
                                    </div>
                                </div>
                                <img src="logo.png" height="130px" className="ml-auto m-3"/>
                            </div>
                            <div className="d-flex px-4 py-2 bg-lightgrey">
                                <p className="my-auto ti text-black-50">{post.CreatedOn}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default SponsorCard1;