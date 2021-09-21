import React from "react";
import $ from 'jquery'
import Firebase, {db} from "./Firebase";
import {withRouter} from "react-router";

function Header({history}) {
    const goToHome = () => {
        history.push("/");
    }

    const goToDashboard = () => {
        db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
            if (snapshot.exists()) {
                history.push('/sponseeDashboard')
            } else {
                history.push('/sponsorDashboard')
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
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-5" id="header">
            <p className="h1 text-decoration-none ml-5 my-1 font-weight-bold text-purple cursor-pointer"
               onClick={goToHome}>
                SponsRoar
            </p>
            <div className="navbar-nav ml-auto mr-5">
                <p className="p1 mr-4 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer font-weight-bold"
                   onClick={() => history.push('/sponseeLogin')}>Login</p>
                <p className="p1 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer mr-5 font-weight-bold"
                   onClick={() => history.push('/sponseeSignUp')}>Sign Up</p>
                <img width={35} src={"profile.png"} className="rounded-circle pImage cursor-pointer"
                     onClick={goToDashboard}/>
            </div>
        </div>
    );
}

export default withRouter(Header);