import {Dispatch} from 'redux'
import {setAppStatusAC, setInitializeAC} from '../../app/app-reducer'
import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


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
    }
})
export const authReducer = slice.reducer

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setInitializeAC({initializedValue: true}))
        }
    }).finally(() => {
        dispatch(setInitializeAC({initializedValue: true}))
    })
}

export const LogOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logOut().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const {setIsLoggedInAC} = slice.actions

// types
// type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
