import React from "react";
import {useHistory} from "react-router-dom";
import $ from 'jquery'
import Firebase, {db} from "./Firebase";

function Header() {
    const history = useHistory();
    const goToHome = () => {
        history.push("/");
    }

    const goToSponseeLogin = () => {
        history.push("/sponseeLogin");
    }

    const goToSponseeSignUp = () => {
        history.push("/sponseeSignUp");
    }

    const goToDashboard = () => {
        db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
            if (snapshot.exists()) {
                history.push("/sponseeDashboard");
            } else {
                history.push("/sponsorDashboard");
            }
        })
    }

    Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('.pImage').show();
            $('.p1').hide();
        } else {
            $('.pImage').hide();
            $('.p1').show();
        }
    });

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
            <p className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
               onClick={goToHome}>
                SponsRoar
            </p>
            <div className="navbar-nav ml-auto mr-5">
                <p className="p1 mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToSponseeLogin}>Login</p>
                <p className="p1 mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToSponseeSignUp}>Sign Up</p>
                <img width={35} src={"profile.png"} className="rounded-circle pImage cursor-pointer"
                     onClick={goToDashboard}/>
            </div>
        </div>
    );
}

export default Header;