import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../style/appNavbar.css';


function AppNavbar() {

    const { pathname } = useLocation();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/movies', label: 'Movies' },
        { href: '/tv', label: 'Series' },
        { href: '/upcoming', label: 'Upcoming' },
    ]

    return pathname === '/' | pathname === '/movies' | pathname === '/tv' | pathname === '/upcoming' ? (
        <Navbar expand="sm" className="position-fixed py-2 z-3 w-100 flex-column">
            <Container fluid>
                <Link to="/" className='navbar-brand'>
                    <Image
                        src='./imgs/desktop_logo.png'
                        alt='Netflix Logo'
                        style={{ width: '100px' }}
                        className='d-none d-sm-block'
                    />
                    <Image
                        src='./imgs/mobile_logo.png'
                        alt='Netflix Logo'
                        style={{ width: '40px' }}
                        className='d-sm-none'
                    />
                </Link>
                <Navbar.Collapse id="basic-navbar-nav" className='order-1 order-sm-0'>
                    <Nav className="mx-auto nav_links">
                        {
                            navLinks.map((link, idx) => {
                                return (
                                    <NavLink className='nav-link position-relative text-uppercase' key={idx} to={link.href}>{link.label}</NavLink>
                                )
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
                <div className='d-flex align-items-center'>
                    <Link to='/search' className='p-2 fs-5'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <Link to='/profile' className='p-2'>
                        <Image
                            src='https://images.pexels.com/photos/395085/pexels-photo-395085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                            style={{ width: '35px', height: '35px' }}
                            className='object-fit-cover rounded-circle'
                            alt='Profile photo'
                        />
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 shadow-none fs-3 text-white'>
                        <i className="fa-solid fa-bars"></i>
                    </Navbar.Toggle>
                </div>
            </Container>
        </Navbar>
    )
        :
        null
}

export default AppNavbar;