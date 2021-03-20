import React from 'react'
import {useHistory} from "react-router-dom";
import $ from 'jquery'
import Firebase, {db} from "./Firebase";

const SponsorCard = () => {

    const history = useHistory();

    $(document).ready(function () {
        $('.alr').hide();
        $('.d2').click(function () {
            history.push("/sponsorDetails");
            localStorage.setItem("Item", $(this).attr('key'));
        });

        $('.applyBtn').click(function () {
            Firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.ref('sponsee/' + Firebase.auth().currentUser.uid).once("value", snapshot => {
                        if (snapshot.exists()) {

                        } else {
                            $('.alr').show().delay(3000).fadeOut(300);
                        }
                    })
                } else {
                    $('.alr').show().delay(3000).fadeOut(300);
                }
            });
        });
    });

    return (
        Array.apply(null, {length: 5}).map((e, i) => (
            <span className="busterCards" key={i} id={i}>
                <div className="ml-3 mr-5 mb-3">
            <div className="ca">
                <div className="d-flex p-3 bg-white d2">
                    <div className={"pr-3"}>
                        <h6 className="text-primary font-weight-bold br">Brand</h6>
                        <h4 className="font-weight-bold pn">ProductName</h4>
                        <p className="mb-2 mr-4 de">Description</p>
                        <div className="d-flex">
                            <p className="w-50 m-0"><b>Category:</b> Technology</p>
                            <p className="w-50 m-0"><b>Platform:</b> Youtube, Facebook</p>
                        </div>
                    </div>
                    <img src="logo.png" height="130px" className="ml-auto m-3"/></div>
                <div className="d-flex px-4 py-2 bg-lightgrey">
                    <p className="my-auto ti">Time</p>
                    <div className="ml-auto">
                        <img src="favorite.svg" height="20px"/>
                        <img src="share.svg" height="20px" className="mx-4"/>
                        <button className="btn btn-outline-primary px-4 applyBtn">
                            APPLY
                        </button>
                    </div>
                </div>
            </div>
        </div>
         </span>
        ))

    )
}

export default SponsorCard;