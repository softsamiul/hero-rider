import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import './Navigation.css';

const Navigation = () => {
    const {logOut} = useAuth();
    const {user} = useAuth()
    return (
        <Navbar collapseOnSelect expand="lg" className='navbar-container'>
            <Container>
                <Navbar.Brand as={Link} to="/profile" style={{color: '#fff',fontWeight:'bold',fontSize: '25px'}}>Hero Rider</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='custom-navbar-container' style={{lineHeight:'1.4'}}/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    {/* <Nav.Link as = {NavLink} to='/home' style={{fontWeight:600, color: '#333', fontSize:'14px', marginRight:'16px'}}>Home</Nav.Link> */}
                    </Nav>

                    <Nav>
                    

                    
                   <Nav.Link as={Link} to="/dashboard" style={{color: '#fff',fontSize:'16px',textTransform:'uppercase', marginRight:'10px'}}>Dashboard
                    </Nav.Link>
                   <Nav.Link as={Link} to="/profile" style={{color: '#fff',fontSize:'16px',textTransform:'uppercase', marginRight:'10px'}}>
                            Profile
                    </Nav.Link>

                    {
                        user.email ?
                        <button onClick={logOut} className="btn-regular">  Log out</button>
                        : <Nav.Link as={Link} to="/signin" style={{color: '#fff',fontSize:'16px',textTransform:'uppercase'}}>
                            SignIn
                        </Nav.Link>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;