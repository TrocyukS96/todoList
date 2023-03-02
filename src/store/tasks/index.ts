import {asyncActions, slice} from './tasks-slice';

const tasksActions ={
    ...asyncActions,
    ...slice.actions,
}
// Обьеденяем все actions в один объект

const tasksReducer = slice.reducer

export {
    tasksActions,
    tasksReducer
}