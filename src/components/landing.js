import React from "react";
import { withRouter } from "react-router-dom";
import Toolbar from './Toolbar/Toolbar';


class Landing extends React.Component {

    render() {
        return (
            <div>
                <Toolbar/>
                <main style={{marginTop: '64px'}}>
                <p>This is the page content </p>
                </main>
            </div>
        );
    }
}

export default withRouter(Landing);
