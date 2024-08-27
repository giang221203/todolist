export interface ITask {
    id:number,
    name:string,
    description:string,
    priority:string,
    idStatus:number
}


export interface IApiResTask{
    status:boolean,
    message:string,
    content: ITask[]
}