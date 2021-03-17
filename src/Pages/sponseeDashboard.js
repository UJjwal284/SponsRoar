import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponseeDashboard.css';
import Header3 from "../Components/Header3";
import Firebase, {db} from "../Components/Firebase";
import $ from 'jquery'
import Loading from "../Components/Loading";


function sponseeDashboard() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSetPlatforms = () => {
        history.push("/setPlatforms");
    }

    $(document).ready(function () {
        $('.lo').show();
        $('.d1').hide();
        db.ref("sponsee/" + Firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            $('.t1').text(childData['Name']);
            $('.p1').text(childData['Email']);
        });

        $('.div2>div').hide();
        db.ref("/sponsee/" + Firebase.auth().currentUser.uid + "/platforms/").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val();
                $('.div2 #' + key).show();
                $('.div2 #' + key + ' #p1').text(childData['Subscribers']);
                $('.div2 #' + key + ' #p2').text(childData['AvgViewsPerMonth']);
            });
            $('.lo').hide();
            $('.d1').show();
        });
    });

    return (
        <div className="main">
            <Loading/>
            <div className={'d1'}>
                <Header3/>
                <div className={"d-flex m-5"}>
                    <div className={" ml-5 div1"}>
                        <div className="bg-danger p-3 ">
                            <img src={"profileImage.png"} width={100} className={"float-right"}/>
                            <h5 className={"font-weight-bold t1"}>User Name</h5>
                            <p className={"p1"}>email@email.com</p>
                            <button className={"btn btn-primary w-100"}>Edit Profile</button>
                        </div>
                        <div className={'bg-secondary px-4 pt-3 div2 mb-5 mt-3 pb-3 text-center'}>
                            <div id="Facebook" className={'d-flex'}>
                                <img src="facebooklogo.png" width="40px" height="40px" className={'my-auto'}/>
                                <div>
                                    <p id="p1">32415</p>
                                    <p id="p2">5437</p>
                                </div>
                            </div>
                            <div id="Instagram" className={'d-flex'}>
                                <img src="instagramlogo.png" width="40px" height="40px"/>
                                <div>
                                    <p id="p1">32415</p>
                                    <p id="p2">5437</p>
                                </div>
                            </div>
                            <div id="LinkedIn" className={'d-flex'}>
                                <img src="Linkedinlogo.png" width="40px" height="40px"/>
                                <div>
                                    <p id="p1">32415</p>
                                    <p id="p2">5437</p>
                                </div>
                            </div>
                            <div id="Twitter" className={'d-flex'}>
                                <img src="twitterlogo.png" width="40px" height="40px"/>
                                <div>
                                    <p id="p1">32415</p>
                                    <p id="p2">5437</p>
                                </div>
                            </div>
                            <div id="Youtube" className={'d-flex'}>
                                <img src="youtubelogo.png" width="40px" height="40px"/>
                                <div>
                                    <p id="p1">32415</p>
                                    <p id="p2">5437</p>
                                </div>
                            </div>
                            <button className={'btn btn-primary'} onClick={goToSetPlatforms}>Edit</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default sponseeDashboard;