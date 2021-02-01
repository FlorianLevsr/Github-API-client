import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import './style.scss';

const PageNav = ({ changePage, activePage, loading, list, resultPerPage }) => {

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
            disabled={loading || list.length < resultPerPage}
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

//changePage, activePage, loading, list, resultPerPage

PageNav.proptypes = {
    changePage: PropTypes.func.isRequired,
    activePage: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    resultPerPage: PropTypes.number.isRequired
};

export default PageNav;