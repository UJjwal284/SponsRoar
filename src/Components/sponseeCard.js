import React from 'react'
import {useHistory} from "react-router-dom";

const SponseeCard = () => {
    const history = useHistory();
    const goToSponseeDetails = () => {
        history.push("/sponseeDetails");
    }

    return (
        <div className="ml-3 mr-5 mb-3">
            <div className="d-flex p-3 bg-white ca" onClick={goToSponseeDetails}>
                <img src="profileImage.png" width="120px" className="mr-3"/>
                <div>
                    <div className="d-flex">
                        <h4 className="font-weight-bold">User Name</h4>
                        <img height="10px" src="flagIndia.jpg" className="m-2"/>
                    </div>
                    <div className="d-flex mt-4 li">
                        <div>
                            <img height="25px" src="youtubelogo.png"/>
                            <p>343,677</p>
                        </div>
                        <div>
                            <img height="25px" src="facebooklogo.png"/>
                            <p>343,677</p>
                        </div>
                        <div>
                            <img height="25px" src="instagramlogo.png"/>
                            <p>343,677</p>
                        </div>
                        <div>
                            <img height="25px" src="twitterlogo.png"/>
                            <p>343,677</p>
                        </div>
                        <div>
                            <img height="25px" src="linkedinlogo.png"/>
                            <p>343,677</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SponseeCard;