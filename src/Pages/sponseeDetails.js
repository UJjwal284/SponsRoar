import React, {Component} from "react";
import Footer from "../Components/Footer";
import {Link, useParams} from "react-router-dom";
import Header2 from "../Components/Header2";
import $ from "jquery";
import Firebase from "../Components/Firebase";
import {Icon} from '@iconify/react';
import firebase from "../Components/Firebase";

class SponseeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        firebase.database().ref("/sponsee/" + this.id).on('value', (snapshot) => {
            let accounts = snapshot.val();
            let newState = [];
            newState.push({
                Flag: 'twemoji:flag-for-flag-' + accounts.Country,
                Name: accounts.Name
            })
            for (let account in accounts) {
                newState.push({
                    key: account,
                    Email: accounts[account].Email,
                    Name: accounts[account].Name
                })
            }
            this.setState({
                posts: newState,
            })
        });

        $('.li>div').hide();

        Firebase.database().ref("/sponsee/" + this.id + '/platforms').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const key = childSnapshot.key;
                const childData = childSnapshot.val();
                $('#' + key).show();
                $('#' + key + ' p').text(childData['Subscribers']);
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.posts.map(post =>
                    <div className="main">
                        <Header2/>
                        <section className="main py-3 px-5">
                            <div className={"mx-5"}>
                                <div className={"bg-white px-5 py-4"}>
                                    <img src={"/profileImage.png"} height={"100px"} className={"float-right"}/>
                                    <div className={"d-flex"}>
                                        <h3 id={'uname'}>User Name</h3>
                                        {/*<Icon icon={} className={'ml-2'}/>*/}
                                    </div>
                                    <div className="d-flex mt-3 li ml-5">
                                        <div id={'Youtube'}>
                                            <Icon icon={'logos:youtube-icon'} height={25}/>
                                            <p>343,677</p>
                                        </div>
                                        <div id={'Facebook'}>
                                            <Icon icon={'logos:facebook'} height={25}/>
                                            <p>343,677</p>
                                        </div>
                                        <div id={'Instagram'}>
                                            <Icon icon={'logos:instagram-icon'} height={25}/>
                                            <p>343,677</p>
                                        </div>
                                        <div id={'Twitter'}>
                                            <Icon icon={'logos:twitter'} height={25}/>
                                            <p>343,677</p>
                                        </div>
                                        <div id={'LinkedIn'}>
                                            <Icon icon={'logos:linkedin-icon'} height={25}/>
                                            <p>343,677</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Footer/>
                    </div>
                )}
            </div>
        );
    }
}

export default SponseeDetails;