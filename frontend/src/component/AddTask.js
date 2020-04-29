import React, { useState, useContext, useEffect } from 'react';
import { Form, Col } from "react-bootstrap"
import TaskContext from '../context/Task/TaskContext';


function AddTask(props) {
    const [task, settask] = useState({ title: "", text: '' });
    const { title, text } = task;
    const taskContext = useContext(TaskContext);
    const { addTask, current, updateTask, clearCurrent } = taskContext;

    useEffect(() => {
        if (current !== null) { settask(current); }
        else { settask({ title: "", text: '' }); }

    }, [taskContext, current])

    const onChangeHandler = e => {
        settask({ ...task, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        if (!current) {
            addTask(task);
        } else {
            updateTask(task);
        }
        clearCurrent();
    }

    return (
        <Form className="mt-5" onSubmit={onSubmitHandler} >
            <h2 id="head">{current ? "Edit Task : " : "Add Task :"}</h2>
            <Form.Row >
                <Col>
                    <Form.Control placeholder="Enter Task" name="title" value={title} onChange={onChangeHandler} />
                </Col>
                <Col>
                    <Form.Control placeholder="Enter a short Description about task" name="text" value={text} onChange={onChangeHandler} />
                </Col>
                <button type="submit" className="btn btn-primary btn-circle btn-xl">{current ? <i className="fas fa-cog fa-pulse"></i> : <i className="fas fa-plus"></i>}</button>
            </Form.Row>
        </Form>
    );
}

export default AddTask;