import React from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import {useHistory} from "react-router-dom";
import './sponseeDashboard.css';
import Header3 from "../Components/Header3";
import {db} from "../Components/Firebase";
import $ from 'jquery'
import {Icon} from "@iconify/react";

function sponseeDashboard() {
    const CURRENTUSER = localStorage.getItem('CURRENTUSER');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSetPlatforms = () => {
        history.push("/setPlatforms");
    }

    $(document).ready(function () {
        $('.lo').show();
        $('.d1').hide();
        db.ref("sponsee/" + CURRENTUSER).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            $('.t1').text(childData['Name']);
            $('.p1').text(childData['Email']);
        });

        $('.div2>div').hide();
        db.ref("/sponsee/" + CURRENTUSER + "/platforms/").once("value").then(function (snapshot) {
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
        <div className="bg-lightgrey text-white">
            <div className={'d1'}>
                <Header3/>
                <div className={"d-flex m-5"}>
                    <div className={"mb-5 ml-5 div1"}>
                        <div className="bg-white rounded p-3 ">
                            <h5 className={"font-weight-bold t1"}>User Name</h5>
                            <p className={"p1"}>email@email.com</p>
                            <button className={"btn btn-primary w-100 mt-2"}>Edit Profile</button>
                        </div>
                        <div className={'bg-white rounded px-4 pt-3 div2 mb-5 mt-3 pb-3 text-center'}>
                            <div id="Facebook" className={'d-flex'}>
                                <Icon icon={'logos:facebook'} className={'my-auto'} height={50}/>
                                <div>
                                    <p id="p1">0</p>
                                </div>
                            </div>
                            <div id="Instagram" className={'d-flex'}>
                                <Icon icon={'logos:instagram-icon'} className={'my-auto'} height={50}/>
                                <div>
                                    <p id="p1">0</p>
                                </div>
                            </div>
                            <div id="LinkedIn" className={'d-flex'}>
                                <Icon icon={'logos:linkedin-icon'} className={'my-auto'} height={50}/>
                                <div>
                                    <p id="p1">0</p>
                                </div>
                            </div>
                            <div id="Twitter" className={'d-flex'}>
                                <Icon icon={'logos:twitter'} className={'my-auto'} height={50}/>
                                <div>
                                    <p id="p1">0</p>
                                </div>
                            </div>
                            <div id="Youtube" className={'d-flex'}>
                                <Icon icon={'logos:youtube-icon'} className={'my-auto'} height={50}/>
                                <div>
                                    <p id="p1">0</p>
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