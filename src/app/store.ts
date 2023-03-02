import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from '../store/auth'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from "../store/app";
import {tasksReducer} from "../store/tasks";
import {todoListsReducer} from "../store/todolist";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

