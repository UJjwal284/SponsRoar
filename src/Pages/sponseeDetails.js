import React from "react";
import Footer from "../Components/Footer";
import Header2 from "../Components/Header2";
import $ from "jquery";
import firebase from "../Components/Firebase";
import {Icon} from '@iconify/react';
import {useParams} from "react-router-dom";

function SponseeDetails() {
    const {id} = useParams();
    $(document).ready(function () {
        console.log(id)
        let dbRef = firebase.database().ref("/sponsee/" + id);
        dbRef.on('value', (snapshot) => {
            let accounts = snapshot.val();
            $('#uname').text(accounts.Name);
            dbRef.child('/platforms').once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    const key = childSnapshot.key;
                    const childData = childSnapshot.val();
                    $('#' + key).show();
                    $('#' + key + ' p').text(childData['Subscribers']);
                });
            });
        });
        $('.li>div').hide();
        $(".spd>a").attr("href", 'https://www.duckduckgo.com');
        $(".spd>a").attr('target', "_blank");
    });

    return (
        <div>
            <div className="main">
                <Header2/>
                <section className="spseD py-3 px-5">
                    <div className={"mx-5"}>
                        <div className={"bg-white px-5 py-4"}>
                            <img src={"/profile.png"} height={"100px"} className={"float-right"}/>
                            <div className={"d-flex"}>
                                <h3 id={'uname'}>User Name</h3>
                                {/*<Icon icon={} className={'ml-2'}/>*/}
                            </div>
                            <div className="d-flex mt-3 li ml-5 spd">
                                <a>
                                    <div id={'Youtube'}>
                                        <Icon icon={'logos:youtube-icon'} height={25}/>
                                        <p>343,677</p>
                                    </div>
                                </a>
                                <a>
                                    <div id={'Facebook'}>
                                        <Icon icon={'logos:facebook'} height={25}/>
                                        <p>343,677</p>
                                    </div>
                                </a>
                                <a>
                                    <div id={'Instagram'}>
                                        <Icon icon={'logos:instagram-icon'} height={25}/>
                                        <p>343,677</p>
                                    </div>
                                </a>
                                <a>
                                    <div id={'Twitter'}>
                                        <Icon icon={'logos:twitter'} height={25}/>
                                        <p>343,677</p>
                                    </div>
                                </a>
                                <a>
                                    <div id={'LinkedIn'}>
                                        <Icon icon={'logos:linkedin-icon'} height={25}/>
                                        <p>343,677</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    );
}

export default SponseeDetails;