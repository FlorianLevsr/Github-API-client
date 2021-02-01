import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import './style.scss';

const Results = ({ list }) => {

    const Item = ({ name, description, owner }) => (

        <div className="result-item">

            <Link to={`/${owner.login}/${name}`}>

                <Card
                    fluid
                    image={owner.avatar_url}
                    header={name}
                    description={description}
                    meta={owner.login}
                />

            </Link>

        </div>

    );

    Item.propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        owner: PropTypes.shape({
            login: PropTypes.string.isRequired,
            avatar_url: PropTypes.string.isRequired,
            html_url: PropTypes.string.isRequired,
        }).isRequired
    };

    return (

        <div className="result-container">

                {
                    list.map((item) => {
                        return <Item key={item.id} {...item} />
                    })
                }

        </div>

    );

};

Results.prototypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Results;