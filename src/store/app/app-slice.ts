import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todo-lists-service";
import {setIsLoggedIn} from "../auth/actions";
import {setAppError, setAppStatus} from "./actions";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const initializeApp = createAsyncThunk('auth/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}))
        // тут выполняется логика для fulfilled
    }
})

export const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error
            })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
    }
})


export const asyncActions = {initializeApp}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

