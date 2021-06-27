import React from "react";
import {useParams} from "react-router-dom";
import $ from "jquery";
import Firebase, {db} from "../Components/Firebase";
import './sponsorDetails.css'
import Header2 from "../Components/Header2";
import AlertBox from "../Components/AlertBox";
import Footer from "../Components/Footer";

function SponsorDetails() {
    const {id} = useParams();

    $(document).ready(function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
        console.log(id);
        Firebase.database().ref("/posts/" + id).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            $('.t1').text(childData['Brand']);
            $('.t2').text(childData['ProductName']);
            $('.t3').text(childData['Description']);
            $('.t4').text('Posted on: ' + new Date(childData['CreatedOn']).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));

            const createdBy = childData['CreatedBy'];
            Firebase.database().ref('sponsor/' + createdBy).once("value").then(function (snapshot) {
                const childData = snapshot.val();
                $('.sponsorDescription').text(childData['Description']);
            });

            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    if (childData['CreatedBy'] === Firebase.auth().currentUser.uid) {
                        $('.plb').hide();
                    }
                    db.ref("sponsor/" + childData['CreatedBy'] + '/Followers/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {
                            $('.followBtn').text('Unfollow');
                        }
                    });
                }
            });
        });
        $('.pltc > div').hide();

        db.ref("/posts/" + id + "/Platform").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const key = childSnapshot.key;
                const childData = childSnapshot.val();
                $('#' + key).show();
                $('#' + key + ' #p1').text(childData['Value']);
                Firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
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
                    }
                });
            });
            $('.lo').hide();
            $('.d1').show();
        });

        $('.mps button').hide();
        Firebase.database().ref("/posts/" + id + "/Applicants").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                $('#op' + childSnapshot.key).show();
            });
        });

        $('.applyBtn').click(function () {
            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {
                            if ($("input#inYoutube").is(':checked')) {
                                Firebase.database().ref("/posts/" + id + "/Applicants/Youtube/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                            if ($("input#inInstagram").is(':checked')) {
                                Firebase.database().ref("/posts/" + id + "/Applicants/Instagram/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                            if ($("input#inFacebook").is(':checked')) {
                                Firebase.database().ref("/posts/" + id + "/Applicants/Facebook/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                            if ($("input#inWebsite").is(':checked')) {
                                Firebase.database().ref("/posts/" + id + "/Applicants/Website/" + Firebase.auth().currentUser.uid).set({
                                    Status: 'Pending'
                                })
                            }
                        } else {
                            window.scrollTo({top: 0, behavior: 'smooth'});
                            $('.alr').show().delay(3000).fadeOut(300);
                        }
                    })
                } else {
                    window.scrollTo({top: 0, behavior: 'smooth'});
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
                            db.ref("/posts/" + id).once("value").then(function (snapshot) {
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
                            window.scrollTo({top: 0, behavior: 'smooth'});
                            $('.alr').show().delay(3000).fadeOut(300);
                        }
                    })
                } else {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    $('.alr').show().delay(3000).fadeOut(300);
                }
            });
        });
    });

    return (
        <div className="main">
            <div className={'d1 w-100'}>
                <Header2/>
                <AlertBox message={'Login as Sponsee'}/>
                <section className="main py-3 px-5">
                    <div className={"mx-5"}>
                        <div className={"bg-white p-3"}>
                            <div className={'d-flex'}>
                                <div>
                                    <h6 className={"font-weight-bold text-primary t1 cursor-pointer"}>Brand</h6>
                                    <h4 className={"t2 text-justify mr-3"}>Product Name</h4>
                                    <p className={"mt-3 mb-2"}><b>Catagory:</b> Technology</p>
                                    <p className={"mb-1"}><b>Platform:</b> Youtube, Facebook, Instagram,
                                        etc
                                    </p>
                                    <p className="mt-3 mr-3 t3 text-justify">Lorem Ipsum is simply dummy text of the</p>
                                </div>
                                <img className={"mt-4 mb-3 mr-4 ml-auto text-right"}
                                     src={'/logo.png'} height={150}/>
                            </div>
                            <div className={'mt-3 mx-auto rounded-lg plb pb-3 pt-2 px-3 text-center'}>
                                <p className={'h3'}>Platforms</p>
                                <div className={'d-flex pltc'}>
                                    <div className={'mx-3'} id={'Youtube'}>
                                        <input type="checkbox" id="inYoutube" className={'position-absolute mx-0'}/>
                                        <label htmlFor="inYoutube">
                                            <div className={'bg-white rounded-lg splt p-2 hspltc text-center'}>
                                                <img src={'/youtubelogo.png'} height={50}
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
                                                <img src={'/facebooklogo.png'} height={50}/>
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
                                                <img src={'/instagramlogo.png'} height={50}/>
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
                                                <img src={'/linkedinlogo.png'} height={50}/>
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
                                                <img src={'/twitterlogo.png'} height={50}/>
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
                                                <img src={'/websitelogo.png'} height={50}/>
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
                        </div>
                        <div className={"bg-lightgrey py-2 px-4 t4"}>Posted On: an hour ago</div>
                        <div className={"bg-white mt-3 mb-5 p-3"}>
                            <button className={"float-right btn btn-primary mr-4 followBtn"}>Follow</button>
                            <div className={"d-flex mt-2 ml-4"}>
                                <h5>About </h5>
                                <h5 className={"text-primary ml-2 t1"}>Brand</h5>
                            </div>
                            <p className={"mt-3 mb-0 sponsorDescription text-justify mx-4"}/>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    );
}

export default SponsorDetails;