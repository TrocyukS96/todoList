import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}


const slice = createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        setAppErrorAC(state, action:PayloadAction<{ error: string | null }>){
            state.error = action.payload.error
        },
        setAppStatusAC(state, action:PayloadAction<{ status: RequestStatusType }>){
            state.status = action.payload.status
        },
        setInitializeAC(state, action:PayloadAction<{ initializedValue: boolean }>){
            state.isInitialized = action.payload.initializedValue
        },
    }
})
export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setInitializeAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized:boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializeActionType = ReturnType<typeof setInitializeAC>

