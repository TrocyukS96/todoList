import * as authSelectors from './selectors';

import {asyncActions,slice} from './auth-reducer';
import { Login } from './Login';

const authActions ={
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