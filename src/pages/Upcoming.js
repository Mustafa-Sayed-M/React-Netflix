import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cards from '../components/Cards';

function Upcoming() {
    const { upcomingMovies } = useSelector(state => state.movies);

    return (
        <div className='py-5'>
            <Container fluid className='py-5'>
                <Cards className='mb-3' pathLink='/movie/' headTitle='Upcoming' list={upcomingMovies.data.results} />
            </Container>
        </div>
    )
}

export default Upcoming;