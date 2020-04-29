import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container } from "react-bootstrap"
import AlertContect from '../context/Alert/AlertContext';
import AuthContect from '../context/Auth/AuthContext';

function Register(props) {

    const [user, setuser] = useState({ username: "", email: "", password: "", password2: "" });
    const { username, email, password, password2 } = user;
    const alertContext = useContext(AlertContect);
    const authContext = useContext(AuthContect);
    const { register, error, clearError, isAuthenticated, loadUser } = authContext;
    const { setAlert } = alertContext;

    const onChangeHandler = e => setuser({ ...user, [e.target.name]: e.target.value });

    const onSubmithandler = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Password do not Match", "danger");
        } else {
            register(user);
        }
    }
    useEffect(() => {
        loadUser();
        if (isAuthenticated) {
            props.history.push("/todolist");
        }
        if (error) {
            setAlert(error, "danger");
            clearError();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    return (
        <Container>
            <Form className="form" onSubmit={onSubmithandler}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" required name="username" value={username} onChange={onChangeHandler} minLength={5} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email Address" required name="email" value={email} onChange={onChangeHandler} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required name="password" value={password} onChange={onChangeHandler} minLength={6} />
                    <Form.Text className="text-muted">
                        Must be atleast 6 charecter.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChangeHandler} />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </Container>
    );
}

export default Register;