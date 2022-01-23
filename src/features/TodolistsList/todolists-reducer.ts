import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

//thunks
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolistsTC', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolistTC', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolistTC', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    try {

        dispatch(setAppStatusAC({status: 'succeeded'}))
        return{todolist: res.data.data.item}
    } catch (e) {
        return rejectWithValue(null)
    }
})
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitleTC', async (param:{id: string, title: string},{dispatch, rejectWithValue}) => {
        await todolistsAPI.updateTodolist(param.id, param.title)
       return {id:param.id, title:param.title}
})

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
//             return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            // return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            // return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    }, extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})
export const todolistsReducer = slice.reducer

export const {
    changeTodolistTitleAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC
} = slice.actions
//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

