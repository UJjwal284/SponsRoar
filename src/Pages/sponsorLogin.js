import React, {useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './sponsorLogin.css'
import {useHistory} from "react-router-dom";
import Firebase from "../Components/Firebase";

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
        Firebase.auth().signInWithEmailAndPassword(email, password).then(r =>
            history.push("/sponsorDashboard")
        );
    }

    return (
        <div className="main vh-100">
            <Header/>
            <div id="panel" className="rounded shadow p-3 bg-white">
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
                               placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                    <p className="fp text-primary font-weight mb-1">Forgot Password</p>
                    <button type="submit" className="btn btn-primary w-100 mb-2 mt-0" onClick={handleLogin}>Login
                    </button>
                    <p className="h6 cursor-pointer mb-0" onClick={goToSponsorSignUp}>Sign Up Instead</p>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default sponsorLogin;