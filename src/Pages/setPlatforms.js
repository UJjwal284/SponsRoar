import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import $ from "jquery";
import Firebase from "../Components/Firebase";

function setPlatforms() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();

    const goToSponseeDashboard = () => {
        history.push("/sponseeDashboard");
    }

    const setPlatforms = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        if ($("input#Youtube").is(':checked')) {
            Firebase.database().ref("sponsee/" + Firebase.auth().currentUser.uid + "/platforms/Youtube").set({
                Subscribers: $('#YoutubeSet #sel1').val(),
                AvgViewsPerMonth: $('#YoutubeSet #sel2').val()
            })
        }
        if ($("input#Instagram").is(':checked')) {
            Firebase.database().ref("sponsee/" + Firebase.auth().currentUser.uid + "/platforms/Instagram").set({
                Subscribers: $('#InstagramSet #sel1').val(),
                AvgViewsPerMonth: $('#InstagramSet #sel2').val()
            })
        }
        if ($("input#Facebook").is(':checked')) {
            Firebase.database().ref("sponsee/" + Firebase.auth().currentUser.uid + "/platforms/Facebook").set({
                Subscribers: $('#FacebookSet #sel1').val(),
                AvgViewsPerMonth: $('#FacebookSet #sel2').val()
            })
        }
        if ($("input#Twitter").is(':checked')) {
            Firebase.database().ref("sponsee/" + Firebase.auth().currentUser.uid + "/platforms/Twitter").set({
                Subscribers: $('#TwitterSet #sel1').val(),
                AvgViewsPerMonth: $('#TwitterSet #sel2').val()
            })
        }
        if ($("input#LinkedIn").is(':checked')) {
            Firebase.database().ref("sponsee/" + Firebase.auth().currentUser.uid + "/platforms/LinkedIn").set({
                Subscribers: $('#LinkedInSet #sel1').val(),
                AvgViewsPerMonth: $('#LinkedInSet #sel2').val()
            })
        }

        goToSponseeDashboard();
    }

    $(document).ready(function () {
        $('#panel>div>div').hide();
        $(':checkbox').change(function () {
            if (this.checked) {
                $('#' + this.id + "Set").show();
            } else {
                $('div#' + this.id + "Set").hide();
            }
        })
    });

    return (
        <div className="main">
            <Header/>
            <div id="panel" className="rounded shadow p-3 bg-white ">
                <h2 className={'text-center font-weight-bold'}>Select Your Platforms</h2>
                <div>
                    <label htmlFor="Youtube" className={'mt-3'}>Youtube</label>
                    <input id="Youtube" type="checkbox"/>
                    <div id="YoutubeSet" className={'d-flex'}>
                        <input placeholder="Subscribers" id="sel1" className={'form-control mr-3'}/>
                        <input placeholder="Avg. Views / Month" id="sel2" className={'form-control'}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="Facebook" className={'mt-3'}>Facebook</label>
                    <input id="Facebook" type="checkbox"/>
                    <div id="FacebookSet" className={'d-flex'}>
                        <input placeholder="Likes" id="sel1" className={'form-control mr-3'}/>
                        <input placeholder="Avg. Views / Month" id="sel2" className={'form-control'}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="Instagram" className={'mt-3'}>Instagram</label>
                    <input id="Instagram" type="checkbox"/>
                    <div id="InstagramSet" className={'d-flex'}>
                        <input placeholder="Followers" id="sel1" className={'form-control mr-3'}/>
                        <input placeholder="Avg. Views / Month" id="sel2" className={'form-control'}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="Twitter" className={'mt-3'}>Twitter</label>
                    <input id="Twitter" type="checkbox"/>
                    <div id="TwitterSet" className={'d-flex'}>
                        <input placeholder="Subscribers" id="sel1" className={'form-control mr-3'}/>
                        <input placeholder="Avg. Views / Month" id="sel2" className={'form-control'}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="LinkedIn" className={'mt-3'}>LinkedIn</label>
                    <input id="LinkedIn" type="checkbox"/>
                    <div id="LinkedInSet" className={'d-flex mb-4'}>
                        <input placeholder="Subscribers" id="sel1" className={'form-control mr-3'}/>
                        <input placeholder="Avg. Views / Month" id="sel2" className={'form-control'}/>
                    </div>
                </div>
                <div className={'text-center'}>
                    <input id="btn1" type="submit" value="Set Platforms" className={'btn btn-primary'}
                           onClick={setPlatforms}/>
                    <p id="skip" className={'mb-0 mt-1 cursor-pointer'} onClick={goToSponseeDashboard}>Skip</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default setPlatforms;