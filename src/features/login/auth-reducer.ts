import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk<{value: boolean},LoginParamsType, {rejectValue:{errors:Array<string>, fieldsErrors?:Array<FieldErrorType>}}>('auth/login', async (param, thunkAPI) => {
     thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param);

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {value: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors:res.data.messages, fieldsErrors:res.data.fieldsErrors})
        }
    } catch (err){
             handleServerNetworkError({message:'error'}, thunkAPI.dispatch)
             return thunkAPI.rejectWithValue({errors:['error'], fieldsErrors:undefined})
         }
})
export const LogOutTC = createAsyncThunk('auth/LogOut', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({})
        }
    }catch(error:any){
        handleServerNetworkError(error, thunkAPI.dispatch)
    }

})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action:PayloadAction<{ value: boolean }>){
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.value
        })
        builder.addCase(LogOutTC.fulfilled, (state, action) => {
            state.isLoggedIn = false
        })

    }
})
export const authReducer = slice.reducer

// thunks
//
export const {setIsLoggedInAC} = slice.actions
