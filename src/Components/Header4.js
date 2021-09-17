import React from "react";
import {useHistory} from "react-router-dom";
import Firebase, {db} from "./Firebase";
import $ from "jquery";

function Header4() {
    const history = useHistory();
    const goToHome = () => {
        history.push("/");
    }

    const goToFindSponsors = () => {
        history.push("/findSponsors");
    }

    const goToSponsorLogin = () => {
        history.push("/sponsorLogin");
    }

    const goToSponseeLogin = () => {
        history.push("/sponseeLogin");
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

    const goToDashboard = () => {
        db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
            if (snapshot.exists()) {
                history.push("/sponseeDashboard");
            } else {
                history.push("/sponsorDashboard");
            }
        })
    }

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
            <a className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
               onClick={goToHome}>
                SponsRoar
            </a>
            <div className="navbar-nav ml-4">
                <a className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToHome}>Home</a>
                <div className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                     onClick={goToFindSponsors}>Find Sponsors
                </div>
            </div>
            <div className="navbar-nav ml-auto mr-5">
                <button className="p1 btn btn-light bt1 font-weight-normal px-4" onClick={goToSponsorLogin}>Sponsor
                    Login
                </button>
                <button className="p1 btn btn-light bt1 ml-3 font-weight-normal px-4" onClick={goToSponseeLogin}>Sponsee
                    Login
                </button>
                <img width={35} src={"profile.png"} className="rounded-circle pImage cursor-pointer"
                     onClick={goToDashboard}/>
            </div>
        </div>
    );
}

export default Header4;