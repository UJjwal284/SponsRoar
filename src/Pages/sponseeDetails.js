import React from "react";
import Footer from "../Components/Footer";
import {useParams} from "react-router-dom";
import Header2 from "../Components/Header2";
import $ from "jquery";
import Firebase from "../Components/Firebase";

function SponseeDetails() {
    const {id} = useParams();

    $(document).ready(function () {
        Firebase.database().ref("/sponsee/" + id).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            $('#uname').text(childData['Name']);
        });

        $('.li>div').hide();

        Firebase.database().ref("/sponsee/" + id + '/platforms').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const key = childSnapshot.key;
                const childData = childSnapshot.val();
                $('#' + key).show();
                $('#' + key + ' p').text(childData['Subscribers']);
            });
        });
    });

    return (
        <div className="main">
            <Header2/>
            <section className="main py-3 px-5">
                <div className={"mx-5"}>
                    <div className={"bg-white px-5 py-4"}>
                        <img src={"/profileImage.png"} height={"100px"} className={"float-right"}/>
                        <div className={"d-flex"}>
                            <h3 id={'uname'}>User Name</h3>
                            <img src={"/flagIndia.jpg"} height={15} className={"ml-3"}/>
                        </div>
                        <div className="d-flex mt-3 li ml-5">
                            <div id={'Youtube'}>
                                <img height="25px" src="/youtubelogo.png"/>
                                <p>343,677</p>
                            </div>
                            <div id={'Facebook'}>
                                <img height="25px" src="/facebooklogo.png"/>
                                <p>343,677</p>
                            </div>
                            <div id={'Instagram'}>
                                <img height="25px" src="/instagramlogo.png"/>
                                <p>343,677</p>
                            </div>
                            <div id={'Twitter'}>
                                <img height="25px" src="/twitterlogo.png"/>
                                <p>343,677</p>
                            </div>
                            <div id={'LinkedIn'}>
                                <img height="25px" src="/linkedinlogo.png"/>
                                <p>343,677</p>
                            </div>
                            <div id={'Website'}>
                                <img height="25px" src="/websitelogo.png"/>
                                <p>343,677</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default SponseeDetails;