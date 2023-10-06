import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
//import * as Yup from 'yup';
import {
    Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import imagePath from '../assets/login.jpeg';
import routes from '../routes.js';

const Login = () => {
    const auth = useAuth();
    console.log(auth)
    const [authFailed, setAuthFailed] = useState(false);
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            //console.log(values)
          setAuthFailed(false);

          try {
            const res = await axios.post(routes.loginPath(), values);
            localStorage.setItem('user', JSON.stringify(res.data));
            //console.log(JSON.stringify(res.data))
            auth.logIn();
            const { from } = location.state;
            navigate(from);
          } catch (err) {
            formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw err;
        }
    },
    });
    return (
    <Container className='container-fluid h-100'>
        <Row className='justify-content-center align-content-center h-100'>
            <Col className='col-12 col-md-8 col-xxl-6'>
                <Card className='shadow-sm'>
                    <Card.Body className='row p-5'>
                        <Col className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                            <Card.Img className='rounded-circle' alt='Войти' src={imagePath} />
                        </Col>
                        <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                            <h1 className='text-center mb-4'>
                                Войти
                            </h1>
                            <Form.Group className='form-floating mb-3'>
                                <FloatingLabel label='Ваш ник'>
                                <Form.Control
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    disabled={formik.isSubmitting}
                                    placeholder='username'
                                    name='username'
                                    id='username'
                                    autoComplete='username'
                                    isInvalid={authFailed}
                                    required
                                    ref={inputRef}
                                />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className='form-floating mb-3'>
                                <FloatingLabel label='Пароль'>
                                <Form.Control
                                    type='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    disabled={formik.isSubmitting}
                                    placeholder='password'
                                    name='password'
                                    id='password'
                                    autoComplete='current-password'
                                    isInvalid={authFailed}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Неверное имя пользователя или пароль</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <Button type='submit' disabled={formik.isSubmitting} className='w-100 mb-3' variant='outline-primary'>Войти</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer className='p-4'>
                        <div className='text-center'>
                            <span>Нет аккаунта? </span>
                            <Link to='/signup'>Регистрация</Link>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
);
};

export default Login;