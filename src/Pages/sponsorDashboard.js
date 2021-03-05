import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponsorDashboard.css';
import Header3 from "../Components/Header3";


function sponsorDashboard() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponsorLogin = () => {
        history.push("/sponsorLogin");
    }

    return (
        <div className="main vh-100">
            <Header3/>
            <div className={"d-flex m-5"}>
                <div className={"d1 ml-5"}>
                    <div className="bg-danger p-3">
                        <img src={"profileImage.png"} height={100} className={"float-right"}/>
                        <h5 className={"font-weight-bold"}>User Name</h5>
                        <p>email@email.com</p>
                        <button className={"btn btn-primary w-100"}>Edit Profile</button>
                    </div>
                </div>
                <div></div>
            </div>
            <Footer/>
        </div>
    );
}

export default sponsorDashboard;