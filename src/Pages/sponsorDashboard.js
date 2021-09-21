import React, {Component} from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import Header3 from "../Components/Header3";
import {db} from "../Components/Firebase";
import $ from 'jquery'
import SponsorCard1 from "../Components/sponsorCard1";
import {Link} from "react-router-dom";

class sponsorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const CURRENTUSER = localStorage.getItem('CURRENTUSER');
        db.ref("sponsor/" + CURRENTUSER).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            $('.t1').text(childData['Name']);
            $('.p1').text(childData['Email']);
        });
        $('.yhnpas').hide();
    }

    render() {
        return (
            <div className="main">
                <div className={'d1 w-100'}>
                    <Header3/>
                    <div className={"d-flex m-5 pb-3"}>
                        <div className={"d4 ml-5"}>
                            <div className="bg-danger p-3">
                                <h5 className={"font-weight-bold t1"}>User Name</h5>
                                <p className={"p1"}>email@email.com</p>
                                <button className={"btn btn-primary mt-3 w-100"}>Edit Profile</button>
                            </div>
                            <Link to={`/addPost`}>
                                <button className={"btn btn-primary py-2 mt-3 w-100"}>Add Post</button>
                            </Link>
                        </div>
                        <div className={'pl-3 w-75'}>
                            <h3 className={'font-weight-bold'}>Your Posts</h3>
                            <p className={'yhnpas'}>You have not posted any sponsor</p>
                            <SponsorCard1/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
            ;
    }
}

export default sponsorDashboard;