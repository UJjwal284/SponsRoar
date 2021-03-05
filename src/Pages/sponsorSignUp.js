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
                Firebase.auth().signInWithEmailAndPassword(email, password),
            localStorage.setItem("userUID", Firebase.auth().currentUser.uid),
            alert(localStorage.getItem("userUID")),
            db.collection("users").add({
                Name: name,
                Email: email
            }),
            goToSponsorDashboard()
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
                    <div className="form-group">
                        <input type="text" className="form-control border-dark font-weight-bold"
                               placeholder="Company / Brand name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle border-dark font-weight-bold" type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Industry
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li className="dropdown-item">Technology</li>
                            <li className="dropdown-item">Health Care</li>
                            <li className="dropdown-item">etc</li>
                        </ul>
                    </div>
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