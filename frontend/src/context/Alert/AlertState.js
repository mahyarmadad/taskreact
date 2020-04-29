import React, { useReducer } from 'react';
import AlertReducer from './AlertReducer';
import AlertContect from './AlertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

function AlertState(props) {
    const initialState = []
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert 
    const setAlert = (msg, type, timeout = 5000) => {
        const id = Math.random();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        })

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);

    }
    return (
        <AlertContect.Provider value={{
            alerts: state,
            setAlert,
        }}>
            {props.children}

        </AlertContect.Provider>
    );
}

export default AlertState;