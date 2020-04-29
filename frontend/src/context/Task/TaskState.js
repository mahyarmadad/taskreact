import React, { useReducer } from 'react';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import { ADD_TASK, DELETE_TASK, SET_CURRENT, CLEAR_CURRENT, UPDATE_TASK, TASK_ERROR, GET_TASKS, CLEAR_TASKS } from '../types';
import axios from "axios";

function TaskState(props) {
    const initialState = {
        tasks: null,
        current: null,
        error: null,
    }
    const [state, dispatch] = useReducer(TaskReducer, initialState);


    // Get Task
    const getTask = async task => {
        try {
            const res = await axios.get("/api/todo");
            dispatch({ type: GET_TASKS, payload: res.data });

        } catch (error) {
            dispatch({ type: TASK_ERROR, payload: error.response.data.msg });
        }
    }
    // Add Task 
    const addTask = async task => {
        try {
            const res = await axios.post("/api/todo", task);
            dispatch({ type: ADD_TASK, payload: res.data });

        } catch (error) {
            dispatch({
                type: TASK_ERROR,
                payload: error.response.data.msg || error.response.data.errors.map(e => e.msg)
            });

        }
    }
    // Update Task 
    const updateTask = async task => {
        try {
            const res = await axios.put(`/api/todo/${task._id}`, task);
            dispatch({ type: UPDATE_TASK, payload: res.data });

        } catch (error) {
            dispatch({
                type: TASK_ERROR,
                payload: error.res.msg || error.response.data.errors.map(e => e.msg)
            });
        }
    }
    // Delete Task 
    const deleteTask = async id => {
        try {
            const res = await axios.delete(`/api/todo/${id}`);
            dispatch({ type: DELETE_TASK, payload: id });

        } catch (error) {
            dispatch({ type: TASK_ERROR, payload: error.res.msg });

        }
    }
    // set Current
    const setCurrent = task => {
        dispatch({ type: SET_CURRENT, payload: task });
    }
    // clear Current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Clear tasks 
    const cleartasks = () => {
        dispatch({ type: CLEAR_TASKS })
    }
    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            current: state.current,
            error: state.error,
            addTask,
            deleteTask,
            setCurrent,
            clearCurrent,
            updateTask,
            getTask,
            cleartasks,
        }}>
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskState;