import React from "react";
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import Header2 from "../Components/Header2";
import $ from "jquery";
import Firebase, {db} from "../Components/Firebase";
import Loading from "../Components/Loading";
import AlertBox from "../Components/AlertBox";
import './sponsorDetails.css'

function sponsorDetails() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToHome = () => {
        history.push("/home");
    }

    $(document).ready(function () {
        $('.alr').hide();
        $('.d1').hide();
        Firebase.database().ref("/posts/" + localStorage.getItem("Item")).once("value").then(function (snapshot) {
            const key = snapshot.key;
            const childData = snapshot.val();
            $('.t1').text(childData['Brand']);
            $('.t2').text(childData['ProductName']);
            $('.t3').text(childData['Description']);
            $('.t4').text('Posted on: ' + new Date(childData['CreatedOn']).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));

            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.ref("sponsor/" + childData['CreatedBy'] + '/Followers/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {
                            $('.followBtn').text('Unfollow');
                        } else {
                            $('.alr').show().delay(3000).fadeOut(300);
                        }
                    });
                }
            });

            $('.lo').hide();
            $('.d1').show();
        });

        $('.applyBtn').click(function () {
            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {

                        } else {
                            $('.alr').show().delay(3000).fadeOut(300);
                        }
                    })
                } else {
                    $('.alr').show().delay(3000).fadeOut(300);
                }
            });
        });

        $('.followBtn').click(function () {
            // eslint-disable-next-line no-restricted-globals
            event.preventDefault();
            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {
                            db.ref("/posts/" + localStorage.getItem("Item")).once("value").then(function (snapshot) {
                                const key = snapshot.key;
                                const childData = snapshot.val();
                                db.ref("sponsor/" + childData['CreatedBy'] + '/Followers/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                                        if (snapshot.exists()) {
                                            let userRef = db.ref("sponsor/" + childData['CreatedBy'] + '/Followers/' + Firebase.auth().currentUser.uid);
                                            userRef.remove().then(r => $('.followBtn').text('Follow'))
                                        } else {
                                            db.ref("sponsor/" + childData['CreatedBy'] + '/Followers/' + Firebase.auth().currentUser.uid).set({
                                                Follow: true
                                            });
                                            $('.followBtn').text('Unfollow');
                                        }
                                    }
                                )
                            });
                        } else {
                            $('.alr').show().delay(3000).fadeOut(300);
                        }
                    })
                } else {
                    $('.alr').show().delay(3000).fadeOut(300);
                }
            });
        });

    });

    return (
        <div className="main">
            <Loading/>
            <div className={'d1 w-100'}>
                <Header2/>
                <AlertBox message={'Login as Sponsee'}/>
                <section className="main py-3 px-5">
                    <div className={"mx-5"}>
                        <div className={"bg-white d-flex p-3"}>
                            <div>
                                <h6 className={"font-weight-bold text-primary t1 cursor-pointer"}>Brand</h6>
                                <h4 className={"font-weight- t2"}>Product Name</h4>
                                <p className={"mt-3 mb-2 text-lightgrey"}><b>Catagory:</b> Technology</p>
                                <p className={"text-lightgrey mb-1"}><b>Platform:</b> Youtube, Facebook, Instagram, etc
                                </p>
                                <p className="text-lightgrey mt-3 mr-3 t3">Lorem Ipsum is simply dummy text of the
                                    printing
                                    and
                                    typesetting
                                    industry.
                                    Lorem Ipsum has
                                    been the industry's standard dummy text ever since the 1500s, when an unknown
                                    printer
                                    took a
                                    galley
                                    of type and scrambled it to make a type specimen book. It has survived not only five
                                    centuries,
                                    but
                                    also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            </div>
                            <div className={"ml-auto text-right"}>
                                <div className={"mr-4"}>
                                    <img src="favorite.svg" height={18}/>
                                    <img src="share.svg" height={18} className={"mx-4"}/>
                                    <button className={"btn btn-outline-primary px-4 applyBtn"}>
                                        APPLY
                                    </button>
                                </div>
                                <img className={"mt-4 mb-3 mr-5"} src="logo.png" height="175px"/>
                            </div>
                        </div>
                        <div className={"bg-lightgrey py-2 px-4 t4"}>Posted On: an hour ago</div>
                        <div className={"bg-white mt-3 mb-5 p-3"}>
                            <button className={"float-right btn btn-primary mr-5 followBtn"}>Follow</button>
                            <div className={"d-flex mt-2"}>
                                <h5>About </h5>
                                <h5 className={"text-primary ml-2 t1"}>Brand</h5>
                            </div>
                            <p className={"mt-3 mb-0"}>Lorem Ipsum is simply dummy text of the printing and
                                typesetting
                                industry.
                                Lorem Ipsum has
                                been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                took a
                                galley
                                of type and scrambled it to make a type specimen book. It has survived not only five
                                centuries,
                                but
                                also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    );
}

export default sponsorDetails;