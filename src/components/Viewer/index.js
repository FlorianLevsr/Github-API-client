import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Loader } from 'semantic-ui-react';
import axios from 'axios';

import './style.scss';


const Viewer = () => {

    const [loading, setLoading] = useState(false);
    const [repositoryDetails, setRepositoryDetails] = useState({});
    const [owner, setOwner] = useState({});

    const { repositoryOwner, repository } = useParams();

    useEffect(() => {

        const fetchAPI = async () => {

            setLoading(true);

            try {

                const result = await axios({
                    method: 'get',
                    url: `https://api.github.com/repos/${repositoryOwner}/${repository}`
                });

                setRepositoryDetails(result.data);
                setOwner(result.data.owner);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            };

        };

        fetchAPI();

    }, [repositoryOwner, repository]);

    if (loading) {
        return <Loader active fluid>Chargement...</Loader>
    };

    const { name, description, html_url } = repositoryDetails;
    const { avatar_url } = owner;

    return (

        <Card fluid>

            <Card.Content>
                <a href={owner.html_url} target='_blank' rel="noopener noreferrer"><Image
                    circular
                    floated='right'
                    size='tiny'
                    src={avatar_url}
                /></a>
                
                <Card.Header>{name}</Card.Header>

                <a href={html_url} target='_blank' rel="noopener noreferrer"><Card.Meta>{html_url}</Card.Meta></a>

                <Card.Description>{description}</Card.Description>

            </Card.Content>

        </Card>

    )

};

export default Viewer;