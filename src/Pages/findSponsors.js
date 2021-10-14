import React, {Component} from "react";
import './findSponsors.css';
import Footer from "../Components/Footer";
import Header1 from "../Components/Header1";
import SponsorCard from "../Components/sponsorCard";
import FilterFindSponsor from "../Components/FilterFindSponsor";
import {db} from "../Components/Firebase";

class FindSponsors extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="main">
                <div className={'d1 w-100'}>
                    <Header1/>
                    <section>
                        <div className="pb-2 d-flex mt-5 px-5">
                            <FilterFindSponsor/>
                            <div className="li">
                                <main>
                                    <section className='container pr-5'>
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
}


export default FindSponsors;
