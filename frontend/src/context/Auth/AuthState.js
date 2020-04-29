import React, { useReducer } from 'react';
import AuthContect from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ERROR, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';
import setAuthToken from '../setAuthToken';

function AuthState(props) {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null,
    };
    // eslint-disable-next-line
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User 
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    }
    // Register User 
    const register = async formData => {
        try {
            const res = await axios.post("/api/users", formData);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg || error.response.data.errors
            })
        }
    }
    // Login User 
    const login = async formData => {
        try {
            const res = await axios.post("/api/auth", formData);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg || error.response.data.errors.map(e => e.msg)
            })
        }
    }
    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Error 
    const clearError = () => dispatch({ type: CLEAR_ERROR });
    return (
        <AuthContect.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearError,
            loadUser,
            login,
            logout,
        }}>
            {props.children}

        </AuthContect.Provider>
    );
}

export default AuthState;