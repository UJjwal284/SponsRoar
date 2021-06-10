import React from "react";
import './findSponsees.css';
import Footer from "../Components/Footer";
import SponseeCard from "../Components/sponseeCard";
import Header1 from "../Components/Header1";


function findSponsees() {
    return (
        <div className="main vh-100">
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
                    <div className="li w-100 mx-5">
                        <SponseeCard/>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default findSponsees;
