import {todoListsService, TodolistType} from '../../api/todo-lists-service'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RequestStatusType} from "../app";
import {ThunkError} from "../../features/Application/CommonActions/types";
import {handleAsyncServerNetworkError} from "../../utils/error-utils";
import {setAppStatus} from '../app/actions';
import {changeTodolistEntityStatus, changeTodolistFilter} from "./actions";

const initialState: Array<TodolistDomainType> = []


//thunks
const fetchTodoLists = createAsyncThunk<{ todoLists: TodolistType[] }, undefined, ThunkError>('todolists/fetchTodolistsTC', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todoListsService.getTodoLists()
    try {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todoLists: res.data}
    } catch (error: any) {
        //Todo - fix any type
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})


const removeTodolist = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
    try {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {id: todolistId}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const addTodolist = createAsyncThunk('todolists/addTodolistTC', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todoListsService.createTodolist(title)
    try {

        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolist: res.data.data.item}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitleTC', async (param: { id: string, title: string }, {

}) => {
    await todoListsService.updateTodolist(param.id, param.title)
    return {id: param.id, title: param.title}
})

export const asyncActions = {addTodolist, changeTodolistTitle, removeTodolist, fetchTodoLists}

export const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
        builder.addCase(changeTodolistEntityStatus, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        })
        builder.addCase(changeTodolistFilter, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        })
    }
})

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

