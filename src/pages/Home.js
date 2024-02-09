import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Landing from "../components/Landing";
import Cards from "../components/Cards";
import '../style/home.css';
import { fetchSearchMovies, fetchSearchTv, setKeyword } from "../store/slices/searchSlice";

function Home() {

    const { movies } = useSelector(state => state.movies);
    const { searchMovies, searchTv, keyword } = useSelector(state => state.searchResults);
    const { tv } = useSelector(state => state.tv);

    const [query, setQuery] = useState('');

    const dispatch = useDispatch();

    const [activeSection, setActiveSection] = useState('movies');

    const handelActiveSection = (section) => {
        setActiveSection(section);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            dispatch(setKeyword(query));
            dispatch(fetchSearchMovies({ query }));
            dispatch(fetchSearchTv({ query }));
        }
    }

    return (
        <div className='home_page' style={{ minHeight: '100vh' }}>
            <Landing />
            <div className="content py-5">
                <Container fluid>
                    {/* Head List */}
                    <ul className="head_list d-flex align-items-center border-bottom">
                        {/*  */}
                        <li
                            onClick={() => { handelActiveSection('movies') }}
                            className={`${activeSection === 'movies' ? 'active' : ''} py-3 position-relative text-center user-select-none`}
                        >
                            <i className="fa-solid fa-clapperboard"></i>
                            <span className="ms-2">Movies</span>
                        </li>
                        {/*  */}
                        <li
                            onClick={() => { handelActiveSection('series') }}
                            className={`${activeSection === 'series' ? 'active' : ''} py-3 position-relative text-center user-select-none`}
                        >
                            <i className="fa-solid fa-film"></i>
                            <span className="ms-2">Series</span>
                        </li>
                        {/*  */}
                        <li
                            className="p-2 position-relative text-center d-none d-md-inline"
                        >
                            <Form className="position-relative" onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control
                                        className="shadow-none"
                                        type="search"
                                        placeholder="Search..."
                                        aria-label="Search"
                                        defaultValue={keyword}
                                        onChange={(e) => { setQuery(e.currentTarget.value) }}
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="position-absolute end-0 top-0 rounded-start-0 bg-white text-black border-0 px-2 h-100"
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </Button>
                            </Form>
                        </li>
                    </ul>
                    {/* Movies or Series */}
                    <div
                        className="parent position-relative"
                    >
                        <div className={`${activeSection === 'movies' ? 'active' : ''} movies position-absolute w-100 py-4`}>
                            {
                                searchMovies.data.results.length > 0 ?
                                    <Cards pathLink='/movie/' list={searchMovies.data.results} />
                                    :
                                    <Cards pathLink='/movie/' list={movies.data.results} />
                            }
                        </div>
                        <div className={`${activeSection === 'series' ? 'active' : ''} series position-absolute w-100 py-4`}>
                            {
                                searchTv.data.results.length > 0 ?
                                    <Cards pathLink='/series/' list={searchTv.data.results} />
                                    :
                                    <Cards pathLink='/series/' list={tv.data.results} />
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Home;