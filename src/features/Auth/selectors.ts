import {useSelector} from "react-redux";
import {AppRootStateType} from "../CommonActions/types";
// @ts-ignore
export const selectIsLoggedIn = (state: AppRootStateType):boolean => state.auth.isLoggedIn