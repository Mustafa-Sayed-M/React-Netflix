import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearch, setKeyword } from '../store/slices/searchSlice';
import Cards from '../components/Cards';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SearchResults from '../components/SearchResults';
import styles from '../style/search.module.css';

function Search() {
    const { trending } = useSelector(state => state.trending);
    const { searchResults } = useSelector(state => state.searchResults);

    const [query, setQuery] = useState('');
    const [dataFetching, setDataFetching] = useState(searchResults.data.results.length > 0 ? true : false);

    const dispatch = useDispatch();

    const handelSubmit = (event) => {
        event.preventDefault();
        if (query) {
            dispatch(fetchSearch(query));
            dispatch(setKeyword(query));
            setDataFetching(true);
        }
    };

    return (
        <div className='search_page py-5' style={{ minHeight: '100vh' }}>
            <Container fluid>
                <Form noValidate className='w-100 mb-5' onSubmit={(e) => { handelSubmit(e) }}>
                    <Form.Group md="4" controlId="validationCustom01" className='position-relative'>
                        <Form.Control
                            type="search"
                            defaultValue={searchResults.keyword}
                            placeholder="Search..."
                            className={`${styles.input_search} shadow-none`}
                            onChange={(e) => { setQuery(e.target.value) }}
                            autoComplete='off'
                        />
                        <Button
                            className={`${styles.button_submit} position-absolute end-0 top-0 rounded-start-0`}
                            aria-label='Search'
                            type='submit'
                        >Search</Button>
                    </Form.Group>
                </Form>
                {
                    dataFetching ?
                        searchResults.loading ?
                            <Loader />
                            :
                            searchResults.error ?
                                <Error />
                                :
                                <SearchResults className='mb-5' searchResultsList={searchResults.data.results} />
                        :
                        ''
                }
                {
                    trending.loading || trending.error ?
                        ''
                        :
                        <Row className='row-gap-4'>
                            <Cards headTitle='Trending Now' list={trending.data.results} />
                        </Row>
                }
            </Container>
        </div>
    );
}

export default Search;
