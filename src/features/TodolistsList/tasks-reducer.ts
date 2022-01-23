import {
    addTodolistTC,
    fetchTodolistsTC, removeTodolistTC,
} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

//thunks
export const fetchTasksTC =createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI)  => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {tasks, todolistId}
            //возвращаем всегда объект  который будет являться payload
})
//мета-данные - данные, которые приходят в санку через аргументы
export const removeTaskTC = createAsyncThunk('tasks/removeTask',(param:{taskId: string, todolistId: string}, thunkAPI)=>{
    return todolistsAPI.deleteTask(param.todolistId, param.taskId)
        .then(res => ({taskId:param.taskId, todolistId:param.todolistId}))
    //в этом случае санка обязана что-то возвращать, в данном случае - то, что зарезолвит промис
})
export const addTaskTC = createAsyncThunk('tasks/addTaskTC',async (param:{title: string, todolistId: string}, {dispatch,rejectWithValue})=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    }catch (error:any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

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
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action)=>{
            state[action.payload.todoListId].unshift(action.payload)
        })
    }
})
export const tasksReducer = slice.reducer

export const {updateTaskAC} = slice.actions

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId, model: domainModel, todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

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

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
