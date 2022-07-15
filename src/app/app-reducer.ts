import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../api/todolists-api";
import {appActions} from "../features/CommonActions/App";
import {authActions} from "../features/Auth";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const {setIsLoggedInAC} = authActions

export const initializeAppTC = createAsyncThunk('auth/initializeApp', async (param, {dispatch,rejectWithValue}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}))
            // тут выполняется логика для fulfilled
    }
})
const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (state, action) => {
            debugger
            state.isInitialized = true
        })
            .addCase(appActions.setAppError,(state,action)=>{
                state.error = action.payload.error
            })
            .addCase(appActions.setAppStatus,(state,action)=>{
                state.status = action.payload.status
        })
    }
})
export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
