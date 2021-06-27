import React, {Component} from 'react'
import {Link} from "react-router-dom";
import firebase from "firebase";

class SponseeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        let accountRef = firebase.database().ref('sponsee').orderByChild('Name');
        accountRef.on('value', (snapshot) => {
            let accounts = snapshot.val();
            let newState = [];
            for (let account in accounts) {
                newState.push({
                    key: account,
                    Email: accounts[account].Email,
                    Name: accounts[account].Name,
                    Facebook: accounts[account].platforms.Facebook.Subscribers,
                    Instagram: accounts[account].platforms.Instagram.Subscribers,
                    Youtube: accounts[account].platforms.Youtube.Subscribers,
                })
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
                    <Link to={`/sponsee/${post.key}`} className={'text-decoration-none text-dark'}>
                        <div className={'clickMe mb-3'} key={post.key} id={post.key}>
                            <div className="d-flex p-3 bg-white ca">
                                <img src="profileImage.png" width="120px" className="mr-3"/>
                                <div>
                                    <div className="d-flex">
                                        <h4 className="font-weight-bold un">{post.Name}</h4>
                                        <img height="10px" src="flagIndia.jpg" className="m-2"/>
                                    </div>
                                    <div className="d-flex mt-4 li platforms">
                                        <div id={'Youtube'}>
                                            <img height="25px" src="youtubelogo.png"/>
                                            <p>{post.Youtube}</p>
                                        </div>
                                        <div id={'Facebook'}>
                                            <img height="25px" src="facebooklogo.png"/>
                                            <p>{post.Facebook}</p>
                                        </div>
                                        <div id={'Instagram'}>
                                            <img height="25px" src="instagramlogo.png"/>
                                            <p>{post.Instagram}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default SponseeCard;