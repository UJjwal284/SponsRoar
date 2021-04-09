import React from "react";
import './findSponsors.css';
import Footer from "../Components/Footer";
import {useHistory} from "react-router-dom";
import Header1 from "../Components/Header1";
import SponsorCard from "../Components/sponsorCard";
import FilterFindSponsor from "../Components/FilterFindSponsor";

function findSponsors() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToHome = () => {
        history.push("/home");
    }

    return (
        <div className="main">
            <div className={'d1 w-100'}>
                <Header1>
                    <span>Find Sponsees</span>
                </Header1>
                <section>
                    <div className="input-group sb bg-lightgrey pt-2 pb-2">
                        <input type="search" className="form-control p-4" placeholder="Search for Company & Industry"
                               aria-label="Search"
                               aria-describedby="search-addon"/>
                        <button type="button" className="btn btn-primary font-weight-normal ml-1 pl-5 pr-5">Search
                        </button>
                    </div>
                    <div className="pb-2 d-flex mt-2 px-5">
                        <FilterFindSponsor/>
                        <div className="li">
                            <main>
                                <section className='container'>
                                    <SponsorCard/>
                                </section>
                            </main>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        </div>
    );
}

export default findSponsors;
