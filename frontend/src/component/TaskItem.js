import React, { useContext } from 'react';
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom";
import TaskContext from '../context/Task/TaskContext';

function TaskItem({ task }) {
    const taskcontext = useContext(TaskContext);
    const { setCurrent, clearCurrent, deleteTask } = taskcontext;
    const onDelete = id => {
        deleteTask(id);
        clearCurrent();
    }
    return (
        <ListGroup.Item className="d-flex justify-content-between  mt-2 w5 textitem">
            <blockquote className="blockquote mp h0">
                <p className="mp">{task.title}</p>
                <footer className="blockquote-footer mp">{task.text}</footer>
            </blockquote>
            <div className="grid">
                <Link onClick={() => setCurrent(task)} to="#"><i className="fas fa-edit iconedit"></i></Link>
                <Link onClick={() => onDelete(task._id)} to="#"><i className="fas fa-trash-alt icondel"></i></Link>
            </div>
        </ListGroup.Item>
    );
}

export default TaskItem;