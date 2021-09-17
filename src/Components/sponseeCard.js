import React, {Component} from 'react'
import {Link} from "react-router-dom";
import firebase from "firebase";
import {Icon} from '@iconify/react';
import $ from 'jquery'
import '../Pages/findSponsees.css';

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
                    LinkedIn: accounts[account].platforms.LinkedIn.Subscribers,
                    Twitter: accounts[account].platforms.Twitter.Subscribers,
                    Flag: 'twemoji:flag-for-flag-' + accounts[account].Country
                })
                if (accounts[account].platforms.Facebook.Subscribers === 0) {
                    $('#Facebook').hide();
                }
                if (accounts[account].platforms.Instagram.Subscribers === 0) {
                    $('#Instagram').hide();
                }
                if (accounts[account].platforms.Youtube.Subscribers === 0) {
                    $('#Youtube').hide();
                }
                if (accounts[account].platforms.LinkedIn.Subscribers === 0) {
                    $('#LinkedIn').hide();
                }
                if (accounts[account].platforms.Twitter.Subscribers === 0) {
                    $('#Twitter').hide();
                }
            }
            this.setState({
                posts: newState,
            })
        });
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post =>
                    <Link to={{pathname: `/sponsee/${post.key}`, data: post.key}}
                          className={'text-decoration-none text-dark'}>
                        <div className={'clickMe mb-3'} key={post.key} id={post.key}>
                            <div className="d-flex px-5 py-4 bg-white ca">
                                <img src="profile.png" height="140px" className="mr-5 ml-3 photo"/>
                                <div className={'w-100'}>
                                    <div className="d-flex">
                                        <h4 className="font-weight-bold un">{post.Name}</h4>
                                        <Icon icon={post.Flag} className={'ml-2'}/>
                                    </div>
                                    <div className="d-flex mt-4 spli">
                                        <div id={'Youtube'} className={'w-25 text-center bg-lightgrey rounded py-3 xx'}>
                                            <Icon icon={'logos:youtube-icon'} className={'my-auto'} height={25}/>
                                            <p className={'mt-2'}>{post.Youtube}</p>
                                        </div>
                                        <div id={'Facebook'} className={'w-25 text-center bg-lightgrey rounded py-3'}>
                                            <Icon icon={'logos:facebook'} className={'my-auto'} height={25}/>
                                            <p className={'mt-2'}>{post.Facebook}</p>
                                        </div>
                                        <div id={'Instagram'} className={'w-25 text-center bg-lightgrey rounded py-3'}>
                                            <Icon icon={'logos:instagram-icon'} className={'my-auto'} height={25}/>
                                            <p className={'mt-2'}>{post.Instagram}</p>
                                        </div>
                                        <div id={'LinkedIn'} className={'w-25 text-center bg-lightgrey rounded py-3'}>
                                            <Icon icon={'logos:linkedin-icon'} className={'my-auto'} height={25}/>
                                            <p className={'mt-2'}>{post.LinkedIn}</p>
                                        </div>
                                        <div id={'Twitter'} className={'w-25 text-center bg-lightgrey rounded py-3'}>
                                            <Icon icon={'logos:twitter'} className={'my-auto'} height={25}/>
                                            <p className={'mt-2'}>{post.Twitter}</p>
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