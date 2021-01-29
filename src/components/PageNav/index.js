import React from 'react';
import { Button } from 'semantic-ui-react';

import './style.scss';

const PageNav = ({ changePage, activePage, loading, list }) => {

    let component = (

        <div className="navpage-container">

            <Button 
            fluid
            disabled={activePage === 1 || loading }
            onClick={() => {
                changePage(activePage - 1);
            }}
            content="précédent"
            icon="arrow left"
            labelPosition="left"
            />
            
            <Button 
            fluid
            disabled={loading }
            onClick={() => {
                changePage(activePage + 1);
            }}
            content="suivant"
            icon="arrow right"
            labelPosition="right"
            />

        </div>

    );

    if ( list.length === 0) {
        component = null;
    };

    return (
        component
    );

};

export default PageNav;