import React from "react";
import {useHistory} from "react-router-dom";
import $ from "jquery";
import Firebase, {db} from "../Components/Firebase";
import './sponsorDetails.css'
import Loading from "../Components/Loading";
import Header2 from "../Components/Header2";
import AlertBox from "../Components/AlertBox";
import Footer from "../Components/Footer";

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

            if (childData['CreatedBy'] === Firebase.auth().currentUser.uid) {
                $('.plb').hide();
            }

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

        $('.pltc>div').hide();
        db.ref("/posts/" + localStorage.getItem("Item") + "/Platform/").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                $('#' + key).show();
                $('#' + key + ' #p1').text(childData['Value']);
                db.ref('sponsee/' + Firebase.auth().currentUser.uid + "/platforms/" + key).once("value", snapshot => {
                    if (snapshot.exists()) {
                        const childData1 = snapshot.val();
                        if (parseInt(childData1['Subscribers']) < parseInt(childData['Value'])) {
                            $('input#in' + key).attr("disabled", true);
                        }
                    } else {
                        $('input#in' + key).attr("disabled", true);
                    }
                })
            });
            $('.lo').hide();
            $('.d1').show();
        });

        $('.mps button').hide();
        Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                $('#op' + childSnapshot.key).show();
            });
        });

        $('#opInstagram').click(function () {
            $('.ac').empty();
            Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Instagram").once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    Firebase.database().ref("/sponsee/" + childSnapshot.key).once("value").then(function (snapshot) {
                        var Data = snapshot.val();
                        Firebase.database().ref("/sponsee/" + childSnapshot.key + '/platforms/Instagram').once("value").then(function (snapshot) {
                            var Data1 = snapshot.val();
                            $('.ac').append('<p>' + Data['Name'] + ' · ' + Data1['Subscribers'] + '</p>');
                        });
                    });
                });
            });
        })
        $('#opFacebook').click(function () {
            $('.ac').empty();
            Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Facebook").once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    Firebase.database().ref("/sponsee/" + childSnapshot.key).once("value").then(function (snapshot) {
                        var Data = snapshot.val();
                        Firebase.database().ref("/sponsee/" + childSnapshot.key + '/platforms/Facebook').once("value").then(function (snapshot) {
                            var Data1 = snapshot.val();
                            $('.ac').append('<p>' + Data['Name'] + ' · ' + Data1['Subscribers'] + '</p>');
                        });
                    });
                });
            });
        })
        $('#opYoutube').click(function () {
            $('.ac').empty();
            Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Youtube").once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    Firebase.database().ref("/sponsee/" + childSnapshot.key).once("value").then(function (snapshot) {
                        var Data = snapshot.val();
                        Firebase.database().ref("/sponsee/" + childSnapshot.key + '/platforms/Youtube').once("value").then(function (snapshot) {
                            var Data1 = snapshot.val();
                            $('.ac').append('<p>' + Data['Name'] + ' · ' + Data1['Subscribers'] + '</p>');
                        });
                    });
                });
            });
        })
        $('#opWebsite').click(function () {
            $('.ac').empty();
            Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Website").once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    Firebase.database().ref("/sponsee/" + childSnapshot.key).once("value").then(function (snapshot) {
                        var Data = snapshot.val();
                        Firebase.database().ref("/sponsee/" + childSnapshot.key + '/platforms/Website').once("value").then(function (snapshot) {
                            var Data1 = snapshot.val();
                            $('.ac').append('<p>' + Data['Name'] + ' · ' + Data1['Subscribers'] + '</p>');
                        });
                    });
                });
            });
        })

        $('.applyBtn').click(function () {
            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {
                            if ($("input#inYoutube").is(':checked')) {
                                Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Youtube/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                            if ($("input#inInstagram").is(':checked')) {
                                Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Instagram/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                            if ($("input#inFacebook").is(':checked')) {
                                Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Facebook/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                            if ($("input#inWebsite").is(':checked')) {
                                Firebase.database().ref("/posts/" + localStorage.getItem("Item") + "/Applicants/Website/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
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
                        <div className={"bg-white p-3"}>
                            <div className={'d-flex'}>
                                <div>
                                    <h6 className={"font-weight-bold text-primary t1 cursor-pointer"}>Brand</h6>
                                    <h4 className={"font-weight- t2"}>Product Name</h4>
                                    <p className={"mt-3 mb-2 text-lightgrey"}><b>Catagory:</b> Technology</p>
                                    <p className={"text-lightgrey mb-1"}><b>Platform:</b> Youtube, Facebook, Instagram,
                                        etc
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
                                        of type and scrambled it to make a type specimen book. It has survived not only
                                        five
                                        centuries,
                                        but
                                        also the leap into electronic typesetting, remaining essentially unchanged.</p>

                                </div>
                                <div className={"ml-auto text-right"}>
                                    <div className={"mr-4"}>
                                        <img src="favorite.svg" height={18}/>
                                        <img src="share.svg" height={18} className={"mx-4"}/>
                                    </div>
                                    <img className={"mt-4 mb-3 mr-5"} src="logo.png" height="175px"/>
                                </div>
                            </div>
                            <div className={'mt-3 mx-auto rounded-lg plb pb-3 pt-2 px-3 text-center'}>
                                <p className={'h3'}>Platforms</p>
                                <div className={'d-flex pltc'}>
                                    <div className={'mx-3'} id={'Youtube'}>
                                        <input type="checkbox" id="inYoutube" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inYoutube">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'youtubelogo.png'} height={50}
                                                     className={'justify-content-center'}/>
                                                <div className={'mt-1'}>
                                                    <p id="p1">32415</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={'mx-3'} id={'Facebook'}>
                                        <input type="checkbox" id="inFacebook" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inFacebook">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'facebooklogo.png'} height={50}/>
                                                <div className={'mt-1'}>
                                                    <p id="p1">32415</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={'mx-3'} id={'Instagram'}>
                                        <input type="checkbox" id="inInstagram" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inInstagram">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'instagramlogo.png'} height={50}/>
                                                <div className={'mt-1'}>
                                                    <p id="p1">32415</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={'mx-3'} id={'LinkedIn'}>
                                        <input type="checkbox" id="inLinkedIn" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inLinkedIn">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'linkedinlogo.png'} height={50}/>
                                                <div className={'mt-1'}>
                                                    <p id="p1">32415</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={'mx-3'} id={'Twitter'}>
                                        <input type="checkbox" id="inTwitter" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inTwitter">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'twitterlogo.png'} height={50}/>
                                                <div className={'mt-1'}>
                                                    <p id="p1">32415</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={'mx-3'} id={'Website'}>
                                        <input type="checkbox" id="inWebsite" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inWebsite">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'websitelogo.png'} height={50}/>
                                                <div className={'mt-1'}>
                                                    <p id="p1">32415</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <button className={"btn btn-outline-primary px-4 applyBtn mt-3"}>
                                    APPLY
                                </button>
                            </div>
                            <div className={'mt-3 mx-auto rounded-lg pb-3 pt-2 px-3 bg-lightgrey'}>
                                <div className="mt-2 mps">
                                    <button id={'opFacebook'} className={'btn btn-primary'}>Facebook</button>
                                    <button id={'opYoutube'} className={'btn btn-primary'}>Youtube</button>
                                    <button id={'opInstagram'} className={'btn btn-primary'}>Instagram</button>
                                    <button id={'opWebsite'} className={'btn btn-primary'}>Website</button>
                                </div>
                                <div className={'bg-white rounded-lg mt-3 ac'}>
                                </div>
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