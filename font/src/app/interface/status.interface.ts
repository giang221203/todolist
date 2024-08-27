export interface IStatus {
    id:number,
    name:string,
    description:string,
}


export interface IApiResStatus{
    status:boolean,
    message:string,
    content: IStatus[]
}