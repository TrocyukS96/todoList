import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FilterValuesType, TodolistDomainType} from '../../store/todolist/todolists-slice'
import {TaskStatuses} from '../../api/todo-lists-service'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from "react-router-dom";
import {TasksStateType} from "../../store/tasks/tasks-slice"
import {AppRootStateType} from "../Application/CommonActions/types";
import {todoListsActions} from "../../store/todolist";
import {tasksActions} from "../../store/tasks";
import {changeTodolistFilter} from "../../store/todolist/actions";

const {removeTask, addTask,updateTask} = tasksActions


type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = ({demo = false}) => {

    let isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    const {addTodolist,removeTodolist,changeTodolistTitle,fetchTodoLists} = todoListsActions

    const removeTaskAsync = useCallback(function (taskId: string, todolistId: string) {
        const thunk = removeTask({taskId, todolistId})
        dispatch(thunk)
    }, [])

    const addTaskAsync = useCallback(function (title: string, todolistId: string) {
        const thunk = addTask({title, todolistId})
        dispatch(thunk)
    }, [])

    const updateTaskAsync = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        debugger
        const thunk = updateTask({taskId: id, model: {status}, todolistId: todolistId})
        dispatch(thunk)
    }, [])

    const changeTaskTitleAsync = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTask({taskId: id, model: {title: newTitle}, todolistId: todolistId})
        dispatch(thunk)
    }, [])

    const changeTodolistFilterAsync = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilter({id:todolistId, filter:value})
        dispatch(action)
    }, [])

    const removeTodolistAsync = useCallback(function (id: string) {
        const thunk = removeTodolist(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitleAsync = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitle({id, title})
        dispatch(thunk)
    }, [])

    const addTodolistAsync = useCallback((title: string) => {
        const thunk = addTodolist(title)
        dispatch(thunk)
    }, [dispatch])


    useEffect(() => {
        if (demo || !isLogin) {
            debugger
            return;
        }
        dispatch(fetchTodoLists())
    }, [])


    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistAsync}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTaskAsync}
                                changeFilter={changeTodolistFilterAsync}
                                addTask={addTaskAsync}
                                changeTaskStatus={updateTaskAsync}
                                removeTodolist={removeTodolistAsync}
                                changeTaskTitle={changeTaskTitleAsync}
                                changeTodolistTitle={changeTodolistTitleAsync}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
