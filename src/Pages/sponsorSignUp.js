import React, {useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
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
                        Industry: industry
                    }),
                goToSponsorDashboard()
            )
        );
    }

    return (
        <div className="main pb-1">
            <Header/>
            <div id="panel" className="rounded shadow p-3 bg-white">
                <h1 className="font-weight-bold text-center mx-2">Sponsor Sign Up</h1>
                <hr/>
                <p className="h5">Hello!</p>
                <h3 className="h4 font-weight-bold">Welcome Back</h3>
                <p className="text-secondary">You are just a step away from your sponsees</p>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control border-dark font-weight-bold"
                               placeholder="Company / Brand name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <select className="form-select btn border-dark font-weight-bold" value={industry}
                            onChange={(e) => setIndustry(e.target.value)}>
                        <option selected>Industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Health Care">Health Care</option>
                        <option value="Music">Music</option>
                        <option value="Website">Website</option>
                        <option value="Course">Course</option>
                    </select>
                    <div className="form-group mt-3">
                        <input autoFocus required value={email}
                               type="email" className="form-control border-dark font-weight-bold"
                               aria-describedby="emailHelp"
                               placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input required value={password}
                               type="password" className="form-control border-dark font-weight-bold"
                               placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button onClick={handleSignUp} type="submit" className="btn btn-primary w-100 mb-2">Sign Up
                    </button>
                    <p className="h6 text-end cursor-pointer mb-0" onClick={goToSponsorLogin}>Login Instead</p>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default sponsorSignUp;