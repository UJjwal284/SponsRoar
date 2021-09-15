import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'

class FilterFindSponsee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: ["India", "Austria"],
            platforms: ["Youtube", "Facebook", "Instagram", "LinkedIn", "Twitter    "]
        }
    }

    render() {
        $(document).ready(function () {
                $("input[type=checkbox]").each(function () {
                    var sThisVal = (this.checked ? $(this).val() : "");
                });
            }
        );

        return (
            <div>
                <div className="bg-danger filterBox ml-5 px-4 pb-2">
                    <p className="pt-3">Filter By</p>
                    <hr className="bg-lightgrey"/>
                    <h6>Category</h6>
                    {this.state.country.map(element =>
                        <div className={'pl-1'}>
                            <input className="form-check-input" type="checkbox" value="afssa"/>
                            <label className="form-check-label ml-4" htmlFor="flexCheckDefault">
                                {element}
                            </label>
                        </div>
                    )}
                    <hr className="bg-lightgrey"/>
                    <h6>Platforms</h6>
                    {this.state.platforms.map(element =>
                        <div className={'pl-1'}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label ml-4" htmlFor="flexCheckDefault">
                                {element}
                            </label>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterFindSponsee;