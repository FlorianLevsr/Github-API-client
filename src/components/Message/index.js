import React from 'react';
import PropTypes from 'prop-types';
import { Message as SemanticMessage } from 'semantic-ui-react';

import './style.scss';

const Message = ({ total, loading }) => {

    
    let messageColor;
    let messageContent = 'Effectuer une recherche...';
    let situationalMessage = 'résultat';

    if (total > 1 ) {
        situationalMessage = 'résultats'
    };

    if (loading) {
        messageColor = 'yellow';
        messageContent = 'Recherche en cours';
    };

    if (!loading && total > 0) {
        messageColor = 'green';
        messageContent = `Il y a ${total} ${situationalMessage}`;
    };

    if (!loading && total === 0) {
        messageColor = 'red';
        messageContent = 'Aucun résultat'
    };

    return (

        <div className="message-container ">
            <SemanticMessage
            color={messageColor}
            content={messageContent}
            />
        </div>


    );

};

Message.propTypes = {
    total: PropTypes.number,
    loading: PropTypes.bool.isRequired
};

export default Message;