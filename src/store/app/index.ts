import * as appSelectors from './selectors';
import * as actions from './actions';
import {asyncActions, slice , RequestStatusType as T1} from "./app-slice";

const appActions ={
    ...asyncActions,
    ...slice.actions,
    ...actions
}

export type RequestStatusType = T1

const appReducer = slice.reducer

export {
    appActions,
    appSelectors,
    appReducer

}