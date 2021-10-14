import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
import {db} from "./Firebase";

class FilterFindSponsor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ["Technology", "HealthCare"],
            platforms: ["Facebook", "Instagram", "Website", "Youtube"],
            brandsData: []
        }
    }

    componentDidMount() {
        db.ref("sponsor").on('value', (snapshot) => {
            let data = snapshot.val()
            let brands = []
            for (let brand in data) {
                brands.push({
                    name: data[brand].Name,
                    website: data[brand].Website
                })
            }
            this.setState({
                brandsData: brands
            })
        });
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
                    {this.state.category.map(element =>
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
                    <hr className="bg-lightgrey"/>
                    <h6>Brands</h6>
                    {this.state.brandsData.map(element =>
                        <div className={'pl-1'}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label ml-4" htmlFor="flexCheckDefault">
                                {element.name}
                            </label>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FilterFindSponsor;