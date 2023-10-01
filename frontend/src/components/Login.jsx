import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import imagePath from '../assets/login.jpeg';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(6, 'Минимальная длина пароля 6 символов')
                .typeError('Обязательное поле')
                .required('Обязательное поле'),
            password: Yup.string()
            .typeError('Обязательное поле')
            .required('Обязательное поле'),
        }),
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
                        <Form className='col-12 col-md-6 mt-3 mt-mb-0'>
                            <h1 className='text-center mb-4'>
                                Войти
                            </h1>
                            <Form.Group className='form-floating mb-3'>
                                <FloatingLabel controlId='username' label='Ваш ник'>
                                <Form.Control
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    onBlur={formik.handleBlur}
                                    disabled={formik.isSubmitting}
                                    placeholder='username'
                                    name='username'
                                    id='username'
                                    autoComplete='username'
                                    required
                                    ref={inputRef}
                                />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className='form-floating mb-3'>
                                <FloatingLabel controlId='password' label='Пароль'>
                                <Form.Control
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    disabled={formik.isSubmitting}
                                    placeholder='password'
                                    name='password'
                                    id='password'
                                    autoComplete='current-password'
                                    required
                                />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid" className="invalid-feedback">Неверное имя пользователя или пароль</Form.Control.Feedback>
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
