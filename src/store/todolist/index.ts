import {asyncActions, slice} from './todolists-slice';

const todoListsActions ={
    ...asyncActions,
    ...slice.actions
}
// Обьеденяем все actions в один объект

const todoListsReducer = slice.reducer

export {
    todoListsActions,
    todoListsReducer
}