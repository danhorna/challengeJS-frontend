import React from 'react';
import { Redirect } from 'react-router-dom';

function Home() {
    return (
        <React.Fragment>
            {
                <Redirect push to="/me/apps" />
            }
        </React.Fragment>
    )
}

export default Home