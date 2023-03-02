import {AppRootStateType} from "../../features/Application/CommonActions/types";

export const selectIsLoggedIn = (state: AppRootStateType):boolean => state.auth.isLoggedIn

