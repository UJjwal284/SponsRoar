import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './sponseeSignUp.css'
import {useHistory} from "react-router-dom";

function sponseeSignUp() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponseeLogin = () => {
        history.push("/sponseeLogin");
    }

    return (
        <div className="main vh-100">
            <Header/>
            <div id="panel" className="rounded shadow p-3 bg-white">
                <p className="h5">Hello!</p>
                <h3 className="h4 font-weight-bold">Welcome Back</h3>
                <p className="text-secondary">You are just a step away from your sponsors</p>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control border-dark font-weight-bold"
                               placeholder="Your Name"/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="email" className="form-control border-dark font-weight-bold"
                               aria-describedby="emailHelp" placeholder="Enter email">
                        </input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control border-dark font-weight-bold"
                               placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">Sign Up</button>
                    <p className="h6 text-end cursor-pointer mb-0" onClick={goToSponseeLogin}>Login Instead</p>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default sponseeSignUp;