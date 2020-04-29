import { ADD_TASK, DELETE_TASK, SET_CURRENT, CLEAR_CURRENT, UPDATE_TASK, TASK_ERROR, GET_TASKS, CLEAR_TASKS } from "../types";
export default (state, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                loading: false
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task),
                loading: false
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_TASKS:
            return {
                ...state,
                tasks: null,
                current: null
            }
        default:
            return state;
    }
}