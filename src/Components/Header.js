import React from "react";
import {useHistory} from "react-router-dom";
import $ from 'jquery'

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

    $(document).ready(function () {
        if (localStorage.getItem("userUID") !== null) {
            $('.pImage').show();
        } else {
            $('.pImage').hide();
        }
    });

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
            <a className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
               onClick={goToHome}>
                SponsRoar
            </a>
            <div className="navbar-nav ml-auto mr-5">
                <p className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToFindSponsors}>Find
                    Sponsors</p>
                <a className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToFindSponsees}>Find
                    Sponsees</a>
                <img width={35} src={"profile.png"} className="rounded-circle pImage cursor-pointer"
                     onClick={goToSponsorDashboard}/>
            </div>
        </div>
    );
}

export default Header;