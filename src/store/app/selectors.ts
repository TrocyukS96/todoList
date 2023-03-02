import {AppRootStateType} from "../../features/Application/CommonActions/types";
import {RequestStatusType} from "./index";


export const selectStatus = (state:AppRootStateType)=> state.app.status

export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
