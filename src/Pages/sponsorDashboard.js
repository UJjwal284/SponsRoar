import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponsorDashboard.css';
import Header3 from "../Components/Header3";
import Firebase, {db} from "../Components/Firebase";
import $ from 'jquery'


function sponsorDashboard() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToAddPost = () => {
        history.push("/addPost");
    }

    db.ref("sponsor/" + Firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
        const childData = snapshot.val();
        $('.t1').text(childData['Name']);
        $('.p1').text(childData['Email']);
    });
    // eslint-disable-next-line no-restricted-globals
    $(document).ready(function () {
        let x = 0;
        Firebase.database().ref("/posts/").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData['CreatedBy'] === Firebase.auth().currentUser.uid) {
                    x++;
                }
            });
            //alert(x);
        });
    });


    return (
        <div className="main vh-100">
            <Header3/>
            <div className={"d-flex m-5"}>
                <div className={"d1 ml-5"}>
                    <div className="bg-danger p-3">
                        <img src={"profileImage.png"} height={100} className={"float-right"}/>
                        <h5 className={"font-weight-bold t1"}>User Name</h5>
                        <p className={"p1"}>email@email.com</p>
                        <button className={"btn btn-primary w-100"}>Edit Profile</button>
                    </div>
                    <button className={"btn btn-primary py-2 mt-3 w-100"} onClick={goToAddPost}>Add Post</button>
                </div>
                <div></div>
            </div>
            <Footer/>
        </div>
    );
}

export default sponsorDashboard;