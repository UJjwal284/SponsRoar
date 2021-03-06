import React from "react";
import {useHistory} from "react-router-dom";
import $ from 'jquery'
import Firebase from "./Firebase";

function Header() {
    const history = useHistory();
    const goToHome = () => {
        history.push("/");
    }

    const goToFindSponsors = () => {
        history.push("/findSponsors");
    }

    const goToFindSponsees = () => {
        history.push("/findSponsees");
    }

    const goToSponsorDashboard = () => {
        history.push("/sponsorDashboard");
    }

    Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('.pImage').show();
            $('.p1').hide();
            $('.p2').hide();
        } else {
            $('.pImage').hide();
            $('.p1').show();
            $('.p2').show();
        }
    });

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
            <a className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
               onClick={goToHome}>
                SponsRoar
            </a>
            <div className="navbar-nav ml-auto mr-5">
                <p className="p1 mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToFindSponsors}>Find
                    Sponsors</p>
                <a className="p2 mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToFindSponsees}>Find
                    Sponsees</a>
                <img width={35} src={"profile.png"} className="rounded-circle pImage cursor-pointer"
                     onClick={goToSponsorDashboard}/>
            </div>
        </div>
    );
}

export default Header;