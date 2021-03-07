import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponsorDashboard.css';
import Header3 from "../Components/Header3";


function addPost() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToAddPost = () => {
        history.push("/addPost");
    }

    return (
        <div className="main vh-100">
            <Header3/>

            <Footer/>
        </div>
    );
}

export default addPost;