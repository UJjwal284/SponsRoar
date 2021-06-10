import React from "react";
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import sponsorSignUp from "./Pages/sponsorSignUp";
import findSponsors from "./Pages/findSponsors";
import findSponsees from "./Pages/findSponsees";
import sponsorLogin from "./Pages/sponsorLogin";
import sponseeSignUp from "./Pages/sponseeSignUp";
import sponseeLogin from "./Pages/sponseeLogin";
import sponsorDetails from "./Pages/sponsorDetails";
import SponsorDetails from "./Pages/sponsorDetails";
import sponseeDetails from "./Pages/sponseeDetails";
import SponseeDetails from "./Pages/sponseeDetails";
import sponsorDashboard from "./Pages/sponsorDashboard";
import sponseeDashboard from "./Pages/sponseeDashboard";
import addPost from "./Pages/addPost";
import setPlatforms from "./Pages/setPlatforms";
import Home from "./Pages/home";

function App() {
    return (
        <Router>
            <section className="container">
                <Link to="/"/>
            </section>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/sponsorSignUp" component={sponsorSignUp}/>
                <Route path="/findSponsors" component={findSponsors}/>
                <Route path="/findSponsees" component={findSponsees}/>
                <Route path="/sponsorLogin" component={sponsorLogin}/>
                <Route path="/sponseeLogin" component={sponseeLogin}/>
                <Route path="/sponseeSignUp" component={sponseeSignUp}/>
                <Route path="/sponsorDetails" component={sponsorDetails}/>
                <Route path="/sponseeDetails" component={sponseeDetails}/>
                <Route path="/sponsorDashboard" component={sponsorDashboard}/>
                <Route path="/sponseeDashboard" component={sponseeDashboard}/>
                <Route path="/addPost" component={addPost}/>
                <Route path="/setPlatforms" component={setPlatforms}/>
                <Route path="/post/:id">
                    <SponsorDetails/>
                </Route>
                <Route path="/sponsee/:id">
                    <SponseeDetails/>
                </Route>
                <Route path="*">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
