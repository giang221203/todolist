export interface ISubTask {
  id: number;
  name: string;
  description: string;
  priority: string;
  idStatus: number;
  idTask: number;
}

export interface IApiResSubTask {
  status: boolean;
  message: string;
  content: ISubTask[];
}
