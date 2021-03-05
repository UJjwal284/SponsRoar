import React from "react";
import './findSponsees.css';
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import SponseeCard from "../Components/sponseeCard";
import Header1 from "../Components/Header1";


function findSponsees() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToFindSponsors = () => {
        history.push("/findSponsors");
    }

    return (
        <div className="main">
            <Header1>
                <span>Find Sponsors</span>
            </Header1>
            <section>
                <div className="input-group sb bg-lightgrey pt-2 pb-2 mb-2">
                    <input type="search" className="form-control p-4" placeholder="Search for Sponsees"
                           aria-label="Search"
                           aria-describedby="search-addon"/>
                    <button type="button" className="btn btn-primary font-weight-normal ml-1 pl-5 pr-5">Search</button>
                </div>
                <div className="pb-5 d-flex">
                    <div className="bg-white filter mb-3 mr-0 ml-5">
                        <p className="mb-0 text-lightgrey p-2">Filter By</p>
                        <hr className="bg-lightgrey mt-0 mb-0"/>
                        <div className="form-check">
                            <h6 className="ml-3 mt-2">Platform</h6>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                Youtube
                            </label><br/>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                Facebook
                            </label><br/>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                Instagram
                            </label><br/>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                Website
                            </label>
                        </div>
                    </div>
                    <div className="li">
                        <SponseeCard/>
                        <SponseeCard/>
                        <SponseeCard/>
                        <SponseeCard/>
                        <SponseeCard/>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default findSponsees;
