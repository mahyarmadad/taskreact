import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import AddTask from './AddTask';
import TaskContext from '../context/Task/TaskContext';
import TaskList from './TaskList';
import AuthContect from '../context/Auth/AuthContext';


function Todo(props) {
    const taskContext = useContext(TaskContext);
    const { tasks, getTask } = taskContext;
    const authContext = useContext(AuthContect);

    useEffect(() => {
        authContext.loadUser();
        getTask();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="todobg">
            <Container fluid>
                <Row >
                    <Col md={6}>
                        <AddTask />
                    </Col>
                    <Col md={6} className="mb-3">
                        <TaskList tasks={tasks} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Todo;