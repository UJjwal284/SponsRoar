import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponsorDashboard.css';
import Header3 from "../Components/Header3";
import Firebase, {db} from "../Components/Firebase";
import $ from 'jquery'
import Loading from "../Components/Loading";


function sponseeDashboard() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponsorLogin = () => {
        history.push("/sponsorLogin");
    }

    $(document).ready(function () {
            $('.lo').show();
            $('.d1').hide();
            db.ref("sponsee/" + Firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
                const childData = snapshot.val();
                $('.t1').text(childData['Name']);
                $('.p1').text(childData['Email']);
                $('.lo').hide();
                $('.d1').show();
            });
        }
    );

    return (
        <div className="main vh-100">
            <Loading/>
            <div className={'d1'}>
                <Header3/>
                <div className={"d-flex m-5"}>
                    <div className={"d1 ml-5"}>
                        <div className="bg-danger p-3">
                            <img src={"profileImage.png"} height={100} className={"float-right"}/>
                            <h5 className={"font-weight-bold t1"}>User Name</h5>
                            <p className={"p1"}>email@email.com</p>
                            <button className={"btn btn-primary w-100"}>Edit Profile</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default sponseeDashboard;