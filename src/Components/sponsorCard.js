import React from 'react'
import {useHistory} from "react-router-dom";

const SponsorCard = () => {

    const history = useHistory();
    const goToSponsorDetails = () => {
        history.push("/sponsorDetails");
    }

    return (
        <div className="ml-3 mr-5 mb-3">
            <div className="ca" onClick={goToSponsorDetails}>
                <div className="d-flex p-3 bg-white">
                    <div>
                        <h6 className="text-primary font-weight-bold">Brand</h6>
                        <h4 className="font-weight-bold">Product Name</h4>
                        <p className="mb-2 mr-4">Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.
                            Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but
                            also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        <div className="d-flex">
                            <p className="w-50 m-0"><b>Category:</b> Technology</p>
                            <p className="w-50 m-0"><b>Platform:</b> Youtube, Facebook</p>
                        </div>
                    </div>
                    <img src="logo.png" height="130px" className="ml-auto m-3"/></div>
                <div className="d-flex px-4 py-2 bg-lightgrey">
                    <p className="my-auto"> Posted: 2 days ago</p>
                    <div className="ml-auto">
                        <img src="favorite.svg" height="20px"/>
                        <img src="share.svg" height="20px" className="mx-4"/>
                        <button className="btn btn-outline-primary px-4">
                            APPLY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponsorCard;