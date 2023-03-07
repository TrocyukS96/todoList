import { FieldErrorType } from "./todo-lists-service";

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    data: D
}

