import {
    addTodolistTC,
    fetchTodolistsTC, removeTodolistTC,
} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "../CommonActions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AppRootStateType} from "../CommonActions/types";

const initialState: TasksStateType = {}
const {setAppStatus} = appActions

//thunks
export const fetchTasks =createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI)  => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {tasks, todolistId}
            //возвращаем всегда объект  который будет являться payload
})
//мета-данные - данные, которые приходят в санку через аргументы
export const removeTask = createAsyncThunk('tasks/removeTask',(param:{taskId: string, todolistId: string}, thunkAPI)=>{
    return todolistsAPI.deleteTask(param.todolistId, param.taskId)
        .then(res => ({taskId:param.taskId, todolistId:param.todolistId}))
    //в этом случае санка обязана что-то возвращать, в данном случае - то, что зарезолвит промис
})
export const addTask = createAsyncThunk('tasks/addTaskTC',async (param:{title: string, todolistId: string}, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    }catch (error:any) {
        //Todo - изменить any type
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
                                                                      thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType

    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }

    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === 0) {
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error:any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
        //     state[action.payload.task.todoListId].unshift(action.payload.task)
        // },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder) => {
        //позваоляет написать обработчик action, не создавая actionCreator, либо если action из другого редюсера
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTask.fulfilled, (state, action)=>{
            state[action.payload.todoListId].unshift(action.payload)
        })
    }
})
export const tasksReducer = slice.reducer

export const {updateTaskAC} = slice.actions


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof updateTaskAC>

type ThunkDispatch = Dispatch<ActionsType | any>
