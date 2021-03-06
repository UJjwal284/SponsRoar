import React from "react";
import './home.css';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import $ from "jquery";
import Firebase from "../Components/Firebase";

function Home() {
    const history = useHistory();
    const goToSponsorSignUp = () => {
        history.push("/sponsorSignUp");
    }

    const goToSponsorLogin = () => {
        history.push("/sponsorLogin");
    }

    const goToSponseeLogin = () => {
        history.push("/sponseeLogin");
    }

    const goToSponseeSignUp = () => {
        history.push("/sponseeSignUp");
    }

    const goToFindSponsees = () => {
        history.push("/findSponsees");
    }

    const goToFindSponsors = () => {
        history.push("/findSponsors");
    }

    Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('.bt1').hide();
            $('.bt2').hide();
            $('.bt3').show();
        } else {
            $('.bt3').hide();

        }
    });

    return (
        <div>
            <Header/>
            <img className="bgImage position-absolute" src="bg.jpg"/>
            <section>
                <p className="text-white text-large text-center mt-5">Matching Sponsees with great
                    Sponsors</p>
                <div className="d-flex sec1">
                    <div>
                        <h2>For Sponsors</h2>
                        <p>Start sponsoring great events and individuals of right choice.</p>
                        <div className="mt-5">
                            <button className="btn btn-light font-weight-bold bt1" onClick={goToSponsorSignUp}>Sign Up
                            </button>
                            <button className="btn btn-primary font-weight-bold ml-3 bt2"
                                    onClick={goToSponsorLogin}>Login
                            </button>
                            <button className="btn btn-primary font-weight-bold ml-0 bt3"
                                    onClick={goToFindSponsees}>Find
                                Sponsees
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2>For Sponsees</h2>
                        <p>Join the network of thousands of sponsors and start sponsoring your events with great
                            brands.</p>
                        <div className="mt-4">
                            <button className="btn btn-light font-weight-bold bt1" onClick={goToSponseeSignUp}>Sign Up
                            </button>
                            <button className="btn btn-primary font-weight-bold ml-3 bt2"
                                    onClick={goToSponseeLogin}>Login
                            </button>
                            <button className="btn btn-primary font-weight-bold ml-0 bt3"
                                    onClick={goToFindSponsors}>Find Sponsors
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default Home;
