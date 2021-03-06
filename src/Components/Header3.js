import React from "react";
import {useHistory} from "react-router-dom";
import Firebase from "./Firebase";

function Header3() {
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

    const logOut = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        Firebase.auth().signOut().then(r => goToHome());
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
                <button className="btn btn-danger font-weight-bold" onClick={logOut}>Sign Out
                </button>
            </div>
        </div>
    );
}

export default Header3;