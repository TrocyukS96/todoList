import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-service";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {setIsLoggedIn} from "./actions";
import {setAppStatus} from "../app/actions";



const login = createAsyncThunk<undefined, LoginParamsType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err:any) {
        //Todo - изменить any type
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
 const logOut = createAsyncThunk('auth/LogOut', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        //Todo - изменить any type
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})

export const asyncActions = {login,logOut}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {state.isLoggedIn = true})
        builder.addCase(logOut.fulfilled, (state) => {state.isLoggedIn = false})
        builder.addCase(setIsLoggedIn, (state,action) => {state.isLoggedIn = action.payload.value})
    }
})
