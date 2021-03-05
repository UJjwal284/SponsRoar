import React from "react";
import {useHistory} from "react-router-dom";

function Header2({children}) {
    const history = useHistory();
    const goToHome = () => {
        history.push("/");
    }

    const goToFindSponsees = () => {
        history.push("/findSponsees");
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

    return (
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
            <a className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
               onClick={goToHome}>
                SponsRoar
            </a>
            <div className="navbar-nav ml-5">
                <a className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                   onClick={goToHome}>Home</a>

                <div className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                     onClick={goToFindSponsors}>Find Sponsors
                </div>
                <div className="mr-3 mt-auto mb-auto h6 text-decoration-none text-dark cursor-pointer"
                     onClick={goToFindSponsees}>Find Sponsees
                </div>
            </div>
            <div className="navbar-nav ml-auto mr-5">
                <button className="btn btn-light bt1 font-weight-normal" onClick={goToSponsorLogin}>Sponsor Login
                </button>
                <button className="btn btn-light bt1 ml-3 font-weight-normal" onClick={goToSponseeLogin}>Sponsee Login
                </button>
                <img width={35} src={"profile.png"} className="rounded-circle pImage" hidden/>
            </div>
        </div>
    );
}

export default Header2;