import React from 'react';
import './../css/landing.css';
import LandingNavBar from '../components/landingNavBar';
import LandingFooter from '../components/landingFooter';

export default class Landing extends React.Component {
    render() {
        return (<div>
            <LandingNavBar />
            <div id="landingMainDiv">
                <p id="landingMainTitle">Hive</p>
                <p id="landingSubtitle">Coming soon!</p>
            </div>
            {/*<LandingFooter />*/}
        </div>);
    }
}