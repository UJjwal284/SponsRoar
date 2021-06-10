import React, {useState} from "react";
import './sponsorSignUp.css'
import 'firebase/auth';
import Firebase, {db} from "../Components/Firebase";
import {useHistory} from "react-router-dom";


function sponsorSignUp() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [industry, setIndustry] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [website, setWebsite] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sponsorDescription, setSponsorDescription] = useState("");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponsorLogin = () => {
        history.push("/sponsorLogin");
    }

    const goToSponsorDashboard = () => {
        history.push("/sponsorDashboard");
    }

    let handleSignUp = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        Firebase.auth().createUserWithEmailAndPassword(email, password).then(r =>
            Firebase.auth().signInWithEmailAndPassword(email, password).then(r =>
                    db.ref("sponsor/" + Firebase.auth().currentUser.uid).set({
                        Name: name,
                        Email: email,
                        Industry: industry,
                        Website: website,
                        Description: sponsorDescription
                    }),
                localStorage.clear(),
                localStorage.setItem('CURRENTUSER', Firebase.auth().currentUser.uid),
                goToSponsorDashboard()
            )
        )
        ;
    }

    const goToHome = () => {
        history.push("/");
    }

    const goToSponseeSignUp = () => {
        history.push("/sponseeSignUp");
    }

    return (
        <div className="main pb-1">
            <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" id="header">
                <p className="h1 text-decoration-none m-2 ml-5 font-weight-bold text-purple cursor-pointer"
                   onClick={goToHome}>
                    SponsRoar
                </p>
                <div className="navbar-nav ml-auto mr-5">
                    <button className={'btn btn-outline-primary'} onClick={goToSponseeSignUp}>Sign Up as Sponsee
                        Instead
                    </button>
                </div>
            </div>
            <div id="panel" className="rounded shadow p-3 bg-white text-center p-5">
                <p className="h5">Hello!</p>
                <h3 className="h4 font-weight-bold">Welcome Back</h3>
                <input type="text" className="form-control border-dark font-weight-bold mt-3 w-100"
                       placeholder="Company / Brand name" value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <select className="form-control border-dark font-weight-bold w-100 mt-3" value={industry}
                        onChange={(e) => setIndustry(e.target.value)}>
                    <option selected>Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Music">Music</option>
                    <option value="Website">Website</option>
                    <option value="Course">Course</option>
                </select>
                <input type="url" className="form-control border-dark font-weight-bold mt-3 w-100"
                       placeholder="Website" value={website}
                       onChange={(e) => setWebsite(e.target.value)}/>
                <input type="text" className="form-control border-dark font-weight-bold mt-3 w-100"
                       placeholder="Company Description" value={sponsorDescription} maxLength={1000}
                       onChange={(e) => setSponsorDescription(e.target.value)}/>
                <input autoFocus required value={email} type="email"
                       className="form-control border-dark font-weight-bold w-100 mt-3"
                       aria-describedby="emailHelp" placeholder="Enter email"
                       onChange={(e) => setEmail(e.target.value)}>
                </input>
                <input required value={password}
                       type="password" className="form-control border-dark font-weight-bold w-100 mt-3"
                       placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSignUp} type="submit" className="btn btn-primary w-100 mb-2 mt-3">Sign Up
                </button>
                <hr/>
                <p>Already have an account?</p>
                <p className="cursor-pointer mb-0 text-primary" onClick={goToSponsorLogin}>Login</p>
            </div>
        </div>
    );
}

export default sponsorSignUp;