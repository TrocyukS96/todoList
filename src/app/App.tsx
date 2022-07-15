import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Route, Routes} from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import {authActions, authSelectors, Login} from "../features/Auth";
import {useActions} from "../utils/redux-utils";
import {AppRootStateType} from "../features/CommonActions/types";

type PropsType = {
    demo?: boolean
}


function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const {logOut} = useActions(authActions)

    useEffect(() => {
        if(!demo){
            dispatch(initializeAppTC())
        }
    }, [])

    const logOutHandler = ()=>{
        dispatch(logOut())
    }

    if (!isInitialized) {
        console.log('preloader app')
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isInitialized && <Button onClick={logOutHandler} color="inherit" style={{
                        position:'absolute',
                        top:'50%',
                        transform:'translateY(-50%)',
                        right:'20px',
                        border:'2px solid white'
                    }}>Log Out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
