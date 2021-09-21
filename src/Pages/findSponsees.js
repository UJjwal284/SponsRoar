import React from "react";
import './findSponsees.css';
import Footer from "../Components/Footer";
import SponseeCard from "../Components/sponseeCard";
import FilterFindSponsee from "../Components/FilterFindSponsee";
import Header4 from "../Components/Header4";

function findSponsees() {
    return (
        <div className="main">
            <Header4/>
            <section>
                <div className="input-group sb bg-danger pt-2 pb-2 mb-2">
                    <input type="search" className="form-control p-4" placeholder="Search for Sponsees"
                           aria-label="Search"
                           aria-describedby="search-addon"/>
                    <button type="button" className="btn btn-primary font-weight-normal ml-1 pl-5 pr-5">Search</button>
                </div>
                <div className="pb-2 d-flex">
                    <FilterFindSponsee/>
                    <div className="cl1">
                        <SponseeCard/>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default findSponsees;
