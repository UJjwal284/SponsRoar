import React, {useState} from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './sponseeSignUp.css'
import {useHistory} from "react-router-dom";
import Firebase, {db} from "../Components/Firebase";

function sponseeSignUp() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponseeLogin = () => {
        history.push("/sponseeLogin");
    }

    const goToSetPlatforms = () => {
        history.push("/setPlatforms");
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState("");

    let handleSignUp = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        Firebase.auth().createUserWithEmailAndPassword(email, password).then(r =>
                db.ref("sponsee/" + Firebase.auth().currentUser.uid).set({
                    Name: name,
                    Email: email
                }),
            goToSetPlatforms()
        )
    }

    return (
        <div className="main vh-100">
            <Header/>
            <div id="panel" className="rounded shadow p-3 bg-white">
                <h1 className="font-weight-bold text-center mx-2">Sponsee Sign Up</h1>
                <hr/>
                <p className="h5">Hello!</p>
                <h3 className="h4 font-weight-bold">Welcome Back</h3>
                <p className="text-secondary">You are just a step away from your sponsors</p>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control border-dark font-weight-bold"
                               placeholder="Your Name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="email" className="form-control border-dark font-weight-bold"
                               aria-describedby="emailHelp" placeholder="Enter email"
                               onChange={(e) => setEmail(e.target.value)} value={email}>
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control border-dark font-weight-bold"
                               placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2" onClick={handleSignUp}>Sign Up</button>
                    <p className="h6 text-end cursor-pointer mb-0" onClick={goToSponseeLogin}>Login Instead</p>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default sponseeSignUp;