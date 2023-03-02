import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "./index";

const setAppStatus = createAction<{status: RequestStatusType}>('appActions/setAppStatus')
const setAppError = createAction<{error: string | null}>('appActions/setAppError')

export {
    setAppStatus,
    setAppError
}
