import {createAction} from "@reduxjs/toolkit";
import {FilterValuesType} from "./todolists-slice";
import {RequestStatusType} from "../app";

const changeTodolistFilter = createAction<{ id: string, filter: FilterValuesType }>('todoListsActions/changeTodolistFilter')
const changeTodolistEntityStatus = createAction<{ id: string, status: RequestStatusType }>('todoListsActions/changeTodolistEntityStatus')

export {
    changeTodolistFilter,
    changeTodolistEntityStatus
}