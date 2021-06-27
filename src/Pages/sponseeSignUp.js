import React, {useState} from "react";
import './sponseeSignUp.css'
import {useHistory} from "react-router-dom";
import Firebase, {db} from "../Components/Firebase";

function sponseeSignUp() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    }

    const goToSponseeLogin = () => {
        history.push("/sponseeLogin");
    }

    const goToSetPlatforms = () => {
        history.push("/setPlatforms");
    }

    const goToSponsorSignUp = () => {
        history.push("/sponsorSignUp");
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");

    let handleSignUp = () => {
        Firebase.auth().signOut().then(r =>
                // eslint-disable-next-line no-restricted-globals
                event.preventDefault(),
            Firebase.auth().createUserWithEmailAndPassword(email, password).then(r =>
                Firebase.auth().signInWithEmailAndPassword(email, password).then(r =>
                        db.ref("sponsee/" + Firebase.auth().currentUser.uid).set({
                            Name: name,
                            Email: email
                        }),
                    localStorage.clear(),
                    localStorage.setItem('CURRENTUSER', Firebase.auth().currentUser.uid),
                    goToSetPlatforms()
                )
            )
        )
    }

    return (
        <div className="main vh-100">
            <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
                <p className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
                   onClick={goToHome}>
                    SponsRoar
                </p>
                <div className="navbar-nav ml-auto mr-5">
                    <button className={'btn btn-outline-primary'} onClick={goToSponsorSignUp}>Sign Up as Sponsor
                        Instead
                    </button>
                </div>
            </div>
            <div id="panel" className="rounded shadow p-3 bg-white text-center p-5">
                <p className="h5">Hello!</p>
                <h3 className="h4 font-weight-bold">Welcome Back</h3>
                <input type="text" className="form-control border-dark font-weight-bold mt-3 w-100"
                       placeholder="Your Name" value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <input type="email" className="form-control border-dark font-weight-bold w-100 mt-3"
                       aria-describedby="emailHelp" placeholder="Enter email"
                       onChange={(e) => setEmail(e.target.value)} value={email}>
                </input>
                <input type="password" className="form-control border-dark font-weight-bold w-100 mt-3"
                       placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button type="submit" className="btn btn-primary w-100 mb-2 mt-3" onClick={handleSignUp}>Sign Up
                </button>
                <hr/>
                <p>Already have an account?</p>
                <p className="cursor-pointer mb-0 text-primary" onClick={goToSponseeLogin}>Login</p>
            </div>
        </div>
    );
}

export default sponseeSignUp;