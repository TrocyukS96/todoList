import * as authSelectors from './selectors';
import * as actions from './actions'

import {asyncActions,slice} from './auth-slice';
import { Login } from '../../features/Auth/Login';

const authActions ={
    ...actions,
    ...asyncActions,
    ...slice.actions
}
// Обьеденяем все actions в один объект

const authReducer = slice.reducer

export {
    authSelectors,
    Login,
    authActions,
    authReducer
}