import React, {useState} from "react";
import './sponseeLogin.css'
import {useHistory} from "react-router-dom";
import Firebase from "../Components/Firebase";
import AlertBox from "../Components/AlertBox";
import $ from "jquery";

function sponseeLogin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    }

    const goToSponsorLogin = () => {
        history.push("/sponsorLogin");
    }

    const goToSponseeSignUp = () => {
        history.push("/sponseeSignUp");
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
                localStorage.clear(),
            localStorage.setItem('CURRENTUSER', Firebase.auth().currentUser.uid),
            history.push("/sponseeDashboard"),

            // db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
            //     if (snapshot.exists()) {
            //         history.push("/sponseeDashboard")
            //     } else {
            //         alert("Account Not Found");
            //         Firebase.auth().signOut();
            //         $('.d3').hide();
            //     }
            // })
        );
    }

    const handleForgotPassword = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        $('.d3').show();
        Firebase.auth().sendPasswordResetEmail(email).then(function (user) {
            $('.alr').show().delay(3000).fadeOut(300);
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
                <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
                    <p className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
                       onClick={goToHome}>
                        SponsRoar
                    </p>
                    <div className="navbar-nav ml-auto mr-5">
                        <button onClick={goToSponsorLogin} className={'btn btn-outline-primary'}>Login as Sponsor
                            Instead
                        </button>
                    </div>
                </div>
                <AlertBox message={'Password reset email sent'}/>
                <div id="panel" className="rounded shadow p-3 bg-white text-center p-5">
                    <p className="h5">Hello!</p>
                    <h3 className="h4 font-weight-bold">Welcome Back</h3>
                    <input type="email" className="form-control border-dark font-weight-bold w-100 mt-4"
                           aria-describedby="emailHelp" placeholder="Enter email"
                           onChange={(e) => setEmail(e.target.value)} value={email}>
                    </input>
                    <input type="password" className="form-control border-dark font-weight-bold w-100 mt-3"
                           placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    <p className="fp text-primary font-weight mb-1 cursor-pointer float-right mt-2"
                       onClick={handleForgotPassword}>Forgot Password?</p>
                    <button type="submit" className="btn btn-primary w-100 mb-2 mt-1" onClick={handleLogin}>Login
                    </button>
                    <hr/>
                    <p>Don't have an account?</p>
                    <p className="text-primary mb-0 cursor-pointer" onClick={goToSponseeSignUp}>Sign Up</p>
                </div>
            </div>
        </div>
    );
}

export default sponseeLogin;