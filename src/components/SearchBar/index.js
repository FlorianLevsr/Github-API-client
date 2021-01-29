import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import './style.scss';

const SearchBar = ({ inputValue, onChangeHandler, onSubmitHandler, loading }) => {

    return (

        <div className="searchbar-container">

            <form onSubmit={(event) => {
                event.preventDefault();
                onSubmitHandler();
            }}>

                <Input
                    value={inputValue}
                    onChange={(event) => onChangeHandler(event.target.value)}
                    icon="search"
                    iconPosition="left"
                    placeholder="Rechercher..."
                    fluid
                    loading={loading}
                />

            </form>

        </div>

    );

};

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default SearchBar;