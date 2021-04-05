import React from "react";
import './home.css';
import Header from "../Components/Header";
import {Link} from "react-router-dom";
import $ from "jquery";
import Firebase from "../Components/Firebase";

function Home() {

    $(document).ready(function () {
        $('.d1').hide();
        Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                $('.bt1').hide();
                $('.bt2').hide();
                $('.bt3').show();
            } else {
                $('.bt3').hide();

            }
            $('.lo').hide();
            $('.d1').show();
        });
    });

    return (
        <div>
            <div className={'secbg w-100 h-100 position-absolute'}/>
            <img className="bgImage position-absolute h-100" src="bg.jpg"/>
            <Header/>
            <section className={'sect'}>
                <p className="text-white text-large font-weight-bold">Promote the products of popular
                    brands.</p>
                <p className={'mt-4 tsml text-white'}>Get your product sponsored or get sponsor for your
                    events.</p>
                <Link to={`/findSponsors`} className='btn btn-primary px-3 py-2 mt-4 btn-main'>
                    Find products to Sponsor
                </Link>
            </section>
        </div>
    );
}

export default Home;
