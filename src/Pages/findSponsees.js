import React from "react";
import './findSponsees.css';
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import SponseeCard from "../Components/sponseeCard";
import Header1 from "../Components/Header1";
import Firebase from "../Components/Firebase";
import $ from "jquery";


function findSponsees() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToFindSponsors = () => {
        history.push("/findSponsors");
    }

    $(document).ready(function () {
        let i = 0;
        Firebase.database().ref("/sponsee/").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const childData = childSnapshot.val();
                $('#' + i + ' .un').text(childData['Name']);
                $('#' + i + ' .scar').attr('key', childSnapshot.key);

                //$('#' + i + ' .li>div').hide();
                // Firebase.database().ref("/sponsee/" + childSnapshot.key + '/platforms').once("value").then(function (snapshot) {
                //     snapshot.forEach(function (childSnapshot) {
                //         const key = childSnapshot.key;
                //         const childData = childSnapshot.val();
                //         $('#' + i + ' #' + key).show();
                //         $('#' + i + ' #' + key + ' p').text(childData['Subscribers']);
                //     });
                // });
                i++;
            });
        });
    });

    return (
        <div className="main vh-100">
            <Header1>
                <span>Find Sponsors</span>
            </Header1>
            <section>
                <div className="input-group sb bg-lightgrey pt-2 pb-2 mb-2">
                    <input type="search" className="form-control p-4" placeholder="Search for Sponsees"
                           aria-label="Search"
                           aria-describedby="search-addon"/>
                    <button type="button" className="btn btn-primary font-weight-normal ml-1 pl-5 pr-5">Search</button>
                </div>
                <div className="pb-5 d-flex">

                <div className="li">
                        <SponseeCard/>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default findSponsees;
