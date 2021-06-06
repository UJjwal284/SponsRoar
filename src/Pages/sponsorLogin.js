import React, {useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './sponsorLogin.css'
import {useHistory} from "react-router-dom";
import Firebase, {db} from "../Components/Firebase";
import $ from "jquery";
import AlertBox from "../Components/AlertBox";

function sponsorLogin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponsorSignUp = () => {
        history.push("/sponsorSignUp");
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        $('.d3').show();
        Firebase.auth().signInWithEmailAndPassword(email, password).then(r =>
            db.ref('sponsor/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                if (snapshot.exists()) {
                    history.push("/sponsorDashboard")
                } else {
                    alert("Account Not Found");
                    Firebase.auth().signOut();
                    $('.d3').hide();
                }
            })
        );
    }

    const handleForgotPassword = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        $('.d3').show();
        Firebase.auth().sendPasswordResetEmail(email).then(function (user) {
            $('.alr').show();
            $('.d3').hide();
        })
    }

    $(document).ready(function () {
        $('.alr').hide();
        $('.d3').hide();
    });

    return (
        <div className="main vh-100">
            {/*<div className="d-flex justify-content-center w-100 d3 position-absolute vh-100">*/}
            {/*    <div className="spinner-border text-primary"/>*/}
            {/*</div>*/}
            <div>
                <Header/>
                <AlertBox message={'Password reset email sent'}/>
                <div id="panel" className="rounded shadow p-3 bg-white">
                    <h1 className="font-weight-bold text-center">Sponsor Login</h1>
                    <hr/>
                    <p className="h5">Hello!</p>
                    <h3 className="h4 font-weight-bold">Welcome Back</h3>
                    <p className="text-secondary">You are just a step away from your sponsees</p>
                    <form>
                        <div className="form-group mt-3">
                            <input type="email" className="form-control border-dark font-weight-bold"
                                   aria-describedby="emailHelp" placeholder="Enter email"
                                   onChange={(e) => setEmail(e.target.value)} value={email}>
                            </input>
                        </div>
                        <div className="form-group mb-1">
                            <input type="password" className="form-control border-dark font-weight-bold"
                                   placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                   value={password}/>
                        </div>
                        <p className="fp text-primary font-weight mb-1 cursor-pointer"
                           onClick={handleForgotPassword}>Forgot
                            Password</p>
                        <button type="submit" className="btn btn-primary w-100 mb-2 mt-0" onClick={handleLogin}>Login
                        </button>
                        <p className="h6 cursor-pointer mb-0" onClick={goToSponsorSignUp}>Sign Up Instead</p>
                    </form>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default sponsorLogin;