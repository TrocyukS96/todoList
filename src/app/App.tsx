import React, {useEffect} from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Route, Routes, useNavigate} from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import {authActions, Login} from "../store/auth";
import {useActions} from "../utils/redux-utils";
import {appActions, appSelectors} from "../store/app";
import {TodoListsList} from "../features/TodolistsList/TodoListsList";

type PropsType = {
    demo?: boolean
}

const {initializeApp} = appActions

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    const status = useSelector(appSelectors.selectStatus)
    const isInitialized = useSelector(appSelectors.selectIsInitialized)
    const {logOut} = useActions(authActions)
    const navigate = useNavigate()

    useEffect(() => {
        if(!demo){
            dispatch(initializeApp())
        }
        debugger
        if(isInitialized){
            navigate('/')
        }
    }, [demo,dispatch])

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
                    <Route path="/" element={<TodoListsList demo={demo}/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
