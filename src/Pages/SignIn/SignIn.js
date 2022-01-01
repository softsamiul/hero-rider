import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './SignIn.css'
import useAuth from '../../Hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const SignIn = () => {
    const {loginUser} = useAuth();
    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        loginUser(data.email, data.password,history, location)
    };

    

    return (
        <div>
            
            <Container>
                <div className='sign--inner-wrapper'>
                    <Row  className='learner-row-wrap test'>
                        <Col md={5}>
                            <div>
                                <img className='img-fluid riding-img-design' src="https://i.ibb.co/MNzY6g5/bicicleta-animada-gif-14.gif" alt="Bike Riding" />
                            </div>
                        </Col>
                        <Col md={7}>
                            <div>
                                <h2 className='sign-in-text'>Sign In</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className='sign-in-form'>
                                    <div className='signin-input-group-wrapper'>
                                        <i className="fas fa-envelope-open me-2 signin-inp-label"></i>
                                        <input type='email' className='signin-inp-field' placeholder='Email' {...register("email", { required: true})} />
                                    </div>
                                    <div className='signin-input-group-wrapper'><i className="fas fa-unlock me-2 signin-inp-label"></i>
                                        <input  type='password' className='signin-inp-field' placeholder='Password' {...register("password")} />
                                    </div>
                                    <p>{errors.password && "Password"}</p>
                                    <input type="submit" className='submit-btn' />
                                </form>
                                <p>Are You new here? No worries! <i className="fas fa-arrow-down mx-2"></i></p>
                                <NavLink to='/signuprider'>
                                    <button className='me-2 join-btn join-btn-1'>Join as rider</button>
                                </NavLink>
                                <NavLink to='/signuplearner'>
                                    <button className='join-btn join-btn-2'>Join as Driving Learner</button>
                                </NavLink>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container> 
        </div>
    );
};

export default SignIn;