import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3d91ee0a-a2e5-4c47-9eef-21fe45b3ba2b',
        // "Access-Control-Allow-Headers":"*",
        // "Access-Control-Allow-Origin":"*",
        // 'Content-Type': 'application/json',
        // "Access-Control-Allow-Methods":"*",
        // "Access-Control-Allow-Credentials":"true",
    }
})

// api
export const todoListsService = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}
export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType,AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
    },
    me(){
        return instance.get<ResponseType<AuthMeType>>('auth/me');
    },
    logOut(){
        return instance.delete<ResponseType>(`auth/login`);
    }
}



// types
type AuthMeType = {
    id:number
    email:string
    password:string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?:string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = {field:string; error:string}
export type ResponseType<D = {}> =  {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    // fieldsErrors: Array<string>
    data: D
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

