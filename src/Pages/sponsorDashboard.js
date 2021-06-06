import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponsorDashboard.css';
import Header3 from "../Components/Header3";
import Firebase, {db} from "../Components/Firebase";
import $ from 'jquery'
import SponsorCard1 from "../Components/sponsorCard1";


function sponsorDashboard() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToAddPost = () => {
        history.push("/addPost");
    }

    db.ref("sponsor/" + Firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
        const childData = snapshot.val();
        $('.t1').text(childData['Name']);
        $('.p1').text(childData['Email']);
    });

    $(document).ready(function () {
            $('.yhnpas').hide();
            let i = 0;
            Firebase.database().ref("/posts/").once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.key;
                    const childData = childSnapshot.val();
                    if (childData['CreatedBy'] === Firebase.auth().currentUser.uid) {
                        $('#' + i + ' .br').text(childData['Brand']);
                        $('#' + i + ' .pn').text(childData['ProductName']);
                        $('#' + i + ' .de').text(childData['Description']);
                        $('#' + i + ' .cat').text('Category: ' + childData['Category']);
                        $('#' + i + ' .d2').attr('key', key);
                        $('#' + i + ' .ti').text('Posted on: ' + new Date(childData['CreatedOn']).toLocaleString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }));
                        i++;
                    }
                });
                for (let i = 0; i < 5; i++) {
                    if ($('#' + i + ' .br').text() === 'Brand') {
                        $('#' + i).hide();
                    }
                }

                if ($('#' + 0 + ' .br').text() === 'Brand') {
                    $('.yhnpas').show();
                }
                $('.lo').hide();
                $('.d1').show();
            });
        }
    );

    return (
        <div className="main">
            {/*<Loading/>*/}
            <div className={'d1 w-100'}>
                <Header3/>
                <div className={"d-flex m-5 pb-3"}>
                    <div className={"d4 ml-5"}>
                        <div className="bg-danger p-3">
                            <img src={"profileImage.png"} height={100} className={"float-right"}/>
                            <h5 className={"font-weight-bold t1"}>User Name</h5>
                            <p className={"p1"}>email@email.com</p>
                            <button className={"btn btn-primary mt-3 w-100"}>Edit Profile</button>
                        </div>
                        <button className={"btn btn-primary py-2 mt-3 w-100"} onClick={goToAddPost}>Add Post</button>
                    </div>
                    <div className={'pl-3 w-75'}>
                        <h3 className={'font-weight-bold'}>Your Posts</h3>
                        <p className={'yhnpas'}>You have not posted any sponsor</p>
                        <SponsorCard1/>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default sponsorDashboard;