import React from 'react';
import { ListGroup } from "react-bootstrap"
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
    if (tasks !== null && tasks.length !== 0) {
        return (
            <ListGroup variant="flush" className="tc mt-3">
                {tasks.map(task => (<TaskItem key={task._id} task={task} />))}
            </ListGroup>
        );
    } else {
        return (

            <ListGroup variant="flush" className="tc mttc">
                <h3 id="notask">No Task Found, maybe Add One </h3>
            </ListGroup>

        );
    }

}

export default TaskList;