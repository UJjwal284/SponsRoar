import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './sponsorLogin.css'
import {useHistory} from "react-router-dom";

function sponseeLogin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponseeSignUp = () => {
        history.push("/sponseeSignUp");
    }

    return (
        <div className="main vh-100">
            <Header/>
            <div id="panel" className="rounded shadow p-3 bg-white">
                <p className="h5">Hello!</p>
                <h3 className="h4 font-weight-bold">Welcome Back</h3>
                <p className="text-secondary">You are just a step away from your sponsors</p>
                <form>
                    <div className="form-group mt-3">
                        <input type="email" className="form-control border-dark font-weight-bold"
                               aria-describedby="emailHelp" placeholder="Enter email">
                        </input>
                    </div>
                    <div className="form-group mb-1">
                        <input type="password" className="form-control border-dark font-weight-bold"
                               placeholder="Password"/>
                    </div>
                    <p className="fp text-primary font-weight mb-1">Forgot Password</p>
                    <button type="submit" className="btn btn-primary w-100 mb-2 mt-1">Login</button>
                    <p className="h6 mb-0 cursor-pointer" onClick={goToSponseeSignUp}>Sign Up Instead</p>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default sponseeLogin;