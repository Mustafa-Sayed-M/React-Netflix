import React, { useEffect, useState } from "react";
import { Button, Container, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/slices/movie_slices/moviesSlice";
import Cards from "../../components/Cards";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

function MoviesPage() {
    const { movies } = useSelector(state => state.movies);

    const [currentPage, setCurrentPage] = useState({ page: 0 });
    const [lastPage, setLastPage] = useState(137);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentPage.page !== 0) {
            dispatch(fetchMovies({ page: currentPage.page }));
        }
    }, [dispatch, currentPage]);


    const handelPrevPage = () => {
        if (currentPage.page > 1) {
            setCurrentPage({ page: currentPage.page - 1 });
            if (currentPage.page === lastPage) {
                setLastPage(currentPage.page - 1);
            }
        }
    }

    const handelNextPage = () => {
        if (currentPage.page === 0) {
            setCurrentPage({ page: currentPage.page + 2 });
        } else {
            setCurrentPage({ page: currentPage.page + 1 });
        }

        if (currentPage.page === lastPage) {
            setLastPage(lastPage + 1);
        }
    }

    const handelCurrentPage = (page_number) => {
        setCurrentPage(page_number);
    }

    return (
        movies.loading ?
            <Loader />
            :
            movies.error ?
                <Error />
                :
                <div className='movies_page py-5' style={{ minHeight: '100vh' }}>
                    <Container fluid className="pt-5">
                        <Cards className='mb-3' pathLink='/movie/' headTitle='Movies' list={movies.data.results} />
                        <Pagination className="justify-content-center">
                            <Button onClick={handelPrevPage} className="rounded-end-0 prev me-2">
                                <i className="fa-solid fa-angles-left"></i>
                            </Button>
                            <Pagination.Item onClick={() => { handelCurrentPage({ page: 1 }) }} className={currentPage.page === 0 || currentPage.page === 1 ? 'active' : 'text-black'}>{1}</Pagination.Item>
                            <Pagination.Item onClick={() => { handelCurrentPage({ page: 2 }) }} className={currentPage.page === 2 ? 'active' : 'text-black'}>{2}</Pagination.Item>
                            <Pagination.Item onClick={() => { handelCurrentPage({ page: 3 }) }} className={currentPage.page === 3 ? 'active' : 'text-black'}>{3}</Pagination.Item>
                            <Pagination.Item onClick={() => { handelCurrentPage({ page: 4 }) }} className={currentPage.page === 4 ? 'active' : 'text-black'}>{4}</Pagination.Item>
                            <Pagination.Item onClick={() => { handelCurrentPage({ page: 5 }) }} className={currentPage.page === 5 ? 'active' : 'text-black'}>{5}</Pagination.Item>
                            <Pagination.Item className="text-black">...</Pagination.Item>
                            <Pagination.Item onClick={() => { handelCurrentPage({ page: lastPage }) }} className={currentPage.page === lastPage ? 'active' : 'text-black'}>{lastPage}</Pagination.Item>
                            <Button onClick={handelNextPage} className="rounded-start-0 next ms-2">
                                <i className="fa-solid fa-angles-right"></i>
                            </Button>
                        </Pagination>
                    </Container>
                </div>
    )
}

export default MoviesPage;