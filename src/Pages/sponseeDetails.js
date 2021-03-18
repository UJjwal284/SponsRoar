import React from "react";
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import Header2 from "../Components/Header2";

function sponseeDetails() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToHome = () => {
        history.push("/home");
    }

    return (
        <div className="main">
            <Header2/>
            <section className="main py-3 px-5">
                <div className={"mx-5"}>
                    <div className={"bg-white p-4"}>
                        <img src={"profileImage.png"} height={"100px"} className={"float-right"}/>
                        <div className={"d-flex"}>
                            <h3>User Name</h3>
                            <img src={"flagIndia.jpg"} height={15} className={"ml-3"}/>
                        </div>
                        <div className="d-flex mt-3 li ml-5">
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
            </section>
            <Footer/>
        </div>
    );
}

export default sponseeDetails;