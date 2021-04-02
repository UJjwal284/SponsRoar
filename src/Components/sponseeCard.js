import React from 'react'
import {useHistory} from "react-router-dom";
import $ from "jquery";

const SponseeCard = () => {
    const history = useHistory();

    $(document).ready(function () {
        $('div.scar').click(function () {
            history.push("/sponseeDetails");
            localStorage.setItem("Item", $(this).attr('key'));
        });
    });

    return (
        Array.apply(null, {length: 5}).map((e, i) => (
            <span className="busterCards" key={i} id={i}>
                <div className="ml-3 mr-5 mb-3 scar">
                    <div className="d-flex p-3 bg-white ca">
                        <img src="profileImage.png" width="120px" className="mr-3"/>
                        <div>
                            <div className="d-flex">
                                <h4 className="font-weight-bold un">User Name</h4>
                                <img height="10px" src="flagIndia.jpg" className="m-2"/>
                            </div>
                            <div className="d-flex mt-4 li">
                                <div id={'Youtube'}>
                                    <img height="25px" src="youtubelogo.png"/>
                                    <p>343,677</p>
                                </div>
                                <div id={'Facebook'}>
                                    <img height="25px" src="facebooklogo.png"/>
                                    <p>343,677</p>
                                </div>
                                <div id={'Instagram'}>
                                    <img height="25px" src="instagramlogo.png"/>
                                    <p>343,677</p>
                                </div>
                                <div id={'Twitter'}>
                                    <img height="25px" src="twitterlogo.png"/>
                                    <p>343,677</p>
                                </div>
                                <div id={'LinkedIn'}>
                                    <img height="25px" src="linkedinlogo.png"/>
                                    <p>343,677</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        ))
    )
}

export default SponseeCard;