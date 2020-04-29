import React, { useContext } from 'react';
import { Navbar, Nav } from "react-bootstrap"
import logo from "./logo.png"
import AuthContect from '../context/Auth/AuthContext';
import TaskContext from '../context/Task/TaskContext';


function Navigation(props) {
    const authContext = useContext(AuthContect);
    const { user, isAuthenticated, logout } = authContext;
    const taskContext = useContext(TaskContext);

    const onLogout = () => {
        logout();
        taskContext.cleartasks();
    }

    const authLink = (
        <Nav className="ml-auto">
            <Nav.Link><i className="fas fa-user"></i> Hello {user && user.username}</Nav.Link>
            <Nav.Link href="/todolist"><i className="fas fa-tasks"></i> Task List</Nav.Link>
            <Nav.Link onClick={onLogout}><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link>
        </Nav>
    );

    const guestLink = (
        <Nav className="ml-auto">
            <Nav.Link href="/login"><i className="fas fa-sign-in-alt"></i> Sign In</Nav.Link>
            <Nav.Link href="/register"><i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
        </Nav>
    );

    return (
        <Navbar bg="light" expand="lg" className="light">
            <Navbar.Brand href="/" id="navbrand"> <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '} Todo List</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {isAuthenticated ? authLink : guestLink}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;





