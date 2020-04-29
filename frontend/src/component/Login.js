import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Col, Row } from "react-bootstrap"
import AuthContect from '../context/Auth/AuthContext';
import AlertContect from '../context/Alert/AlertContext';

function Login(props) {

    const [user, setuser] = useState({ email: "", password: "" });
    const { email, password } = user;
    const alertContext = useContext(AlertContect);
    const authContext = useContext(AuthContect);

    const { login, error, clearError, isAuthenticated, loadUser } = authContext;
    const { setAlert } = alertContext;



    const onChangeHandler = e => setuser({ ...user, [e.target.name]: e.target.value });

    const onSubmithandler = e => {
        e.preventDefault();
        login(user);
    }

    useEffect(() => {

        if (isAuthenticated) {
            props.history.push("/todolist");
        }
        if (error) {
            setAlert(error, "danger");
            clearError();
        }
        loadUser();
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history,])

    return (
        <Container>
            <Form className="form" onSubmit={onSubmithandler}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={onChangeHandler} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}> Password</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChangeHandler} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;