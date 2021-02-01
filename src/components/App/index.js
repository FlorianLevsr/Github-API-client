import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

import './style.scss';

import githublogo from '../../assets/images/logo-github.png';

import SearchBar from '../SearchBar';
import Message from '../Message';
import Results from '../Results';
import PageNav from '../PageNav';
import Viewer from '../Viewer';

const App = () => {

    const [search, setSearch] = useState('');
    const [total, setTotal] = useState();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [searchHistory, setSearchhistory] = useState([]);

    const resultPerPage = 8;
    const maxHistorySlot = 3;

    const searchRepos = async (newPage) => {

        const lastSearchEntry = searchHistory.slice(-1)[0];

        if(!search || lastSearchEntry === search) {
            return;
        };

        setLoading(true);
        setActivePage(newPage || 1);

        if (search){

            setSearchhistory([...searchHistory, search]);

        } else if(searchHistory.length +1 === maxHistorySlot) {

            searchHistory.splice(0, 1);
        };

        try {

            const result = await axios({
                method: 'get',
                url: `https://api.github.com/search/repositories?q=${search}&page=${newPage || activePage}&per_page=${resultPerPage}`
            });

            setTotal(result.data.total_count);
            setList(result.data.items);

        } catch (error) {

            console.error(error);

        } finally {

            setSearch('');
            setLoading(false);

        };

    };

    const isNavPageNeeded = () => {

        if (total <= resultPerPage) {
            return false;
        } else {
            return true;
        }

    };

    return (

        <div className="app">

            <Link to='/'>

                <img src={githublogo} alt="github logo"/>

            </Link>



            <Switch>

                <Route exact path='/'>

                    <SearchBar
                        loading={loading}
                        inputValue={search}
                        onChangeHandler={setSearch}
                        onSubmitHandler={searchRepos} />

                    {searchHistory.length === 0? null : <Header as='h5'>Vos dernières recherches: {searchHistory.join(', ')}</Header>}
                    
                    <Message
                        loading={loading}
                        total={total} />

                    <Results list={list} />

                    {isNavPageNeeded() &&
                        <PageNav
                            activePage={activePage}
                            changePage={(newPage) => {
                                searchRepos(newPage)
                            }}
                            loading={loading}
                            list={list}
                            resultPerPage={resultPerPage} />
                    }

                </Route>

                <Route path='/:repositoryOwner/:repository'>

                    <Viewer />

                </Route>

            </Switch>

        </div>


    );

};

export default App;

