export interface ISubTask {
  id: number;
  name: string;
  description: string;
  priority: string;
  idStatus: number | null;
  idTask: number | null;
}

export interface IApiResSubTask {
  status: boolean;
  message: string;
  content: ISubTask[];
  totalElement: number;
}
