import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './sponsorCard.css'

class FilterFindSponsor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ["Category1", "Category2", "Category3", "Category4", "Category5"],
            platforms: ["Platform1", "Platform2", "Platform3", "Platform4", "Platform5"],
            brands: ["Brand1", "Brand2", "Brand3", "Brand4", "Brand5"],
        }
    }

    render() {
        return (
            <div>
                <div className="bg-white filterBox ml-5 px-4 pb-2">
                    <p className="pt-3">Filter By</p>
                    <hr className="bg-lightgrey"/>
                    <h6>Category</h6>
                    {this.state.category.map(element =>
                        <div className={'pl-1'}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                {element}
                            </label>
                        </div>
                    )}
                    <hr className="bg-lightgrey"/>
                    <h6>Platforms</h6>
                    {this.state.platforms.map(element =>
                        <div className={'pl-1'}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                {element}
                            </label>
                        </div>
                    )}
                    <hr className="bg-lightgrey"/>
                    <h6>Brands</h6>
                    {this.state.brands.map(element =>
                        <div className={'pl-1'}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label " htmlFor="flexCheckDefault">
                                {element}
                            </label>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterFindSponsor;