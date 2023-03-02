import {createAction} from "@reduxjs/toolkit";

const setIsLoggedIn = createAction<{value:boolean}>(
    'authActions/setIsLoggedIn',
)

export {
    setIsLoggedIn
}