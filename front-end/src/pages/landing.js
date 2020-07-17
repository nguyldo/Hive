import React from 'react';
import './../css/landing.css';
import LandingNavBar from '../components/landingNavBar';
import LandingFooter from '../components/landingFooter';
import { connect } from 'react-redux';

class Landing extends React.Component {
    constructor(props) {
        super(props);

        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (<div>
            <LandingNavBar />
            <div id="landingMainDiv">
                <div id="landingImageDiv">
                    <img src="/undraw_happy_announcement.png" id="landingImage" />
                </div>
                <div id="landingTextDiv">
                    <p id="landingMainTitle">Hive</p>
                    <p id="landingSubtitle">Coming soon!</p>
                </div>
            </div>
            {/*<LandingFooter />*/}
        </div>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);