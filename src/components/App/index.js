import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

import './style.scss';

import githublogo from '../../assets/images/logo-github.png';

import SearchBar from '../SearchBar';
import Message from '../Message';
import Results from '../Results';
import PageNav from '../PageNav';

const App = () => {

    const [search, setSearch] = useState('');
    const [total, setTotal] = useState();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [searchHistory, setSearchHistory] = useState([]);

    const resultPerPage = 8;

    const searchRepos = async (newPage) => {

        setLoading(true);
        setActivePage(newPage || 1);
        setSearchHistory([...searchHistory, search]);

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

            <img src={githublogo} alt="github logo" />

            <SearchBar
                loading={loading}
                inputValue={search}
                onChangeHandler={setSearch}
                onSubmitHandler={searchRepos} />

            <Message
                total={total}
                loading={loading}
                total={total} />

            <Results list={list} />

            { isNavPageNeeded() &&
                <PageNav
                    activePage={activePage}
                    changePage={(newPage) => {
                        searchRepos(newPage)
                    }}
                    loading={loading}
                    list={list} />
            }

        </div>


    );

};

export default App;

