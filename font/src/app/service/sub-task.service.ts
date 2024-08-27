import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResSubTask, ISubTask } from '../interface/subtask.interface';

@Injectable({
  providedIn: 'root',
})
export class SubTaskService {
  constructor(private http: HttpClient) {}
  getAllSubTaskById(
    idTask: number,
    name: string,
    priority: string,
    idStatus: number,
    page: number,
    limit: number
  ): Observable<IApiResSubTask> {
    if (idStatus == null || idStatus == undefined) {
      return this.http.get<IApiResSubTask>(
        `http://localhost:8080/api/v1/subtask/getbyidtask/${idTask}?name=${name}&priority=${priority}&page=${page}&limit=${limit}`
      );
    }
    return this.http.get<IApiResSubTask>(
      `http://localhost:8080/api/v1/subtask/getbyidtask/${idTask}?name=${name}&priority=${priority}&idStatus=${idStatus}&page=${page}&limit=${limit}`
    );
  }
  createSubTask(subtask: Omit<ISubTask, 'id'>): Observable<IApiResSubTask> {
    return this.http.post<IApiResSubTask>(
      `http://localhost:8080/api/v1/subtask/create`,
      subtask
    );
  }
  updateSubTask(subtask: ISubTask): Observable<IApiResSubTask> {
    return this.http.put<IApiResSubTask>(
      `http://localhost:8080/api/v1/subtask/update/${subtask.id}`,
      subtask
    );
  }
  deleteSubTask(id: number): Observable<IApiResSubTask> {
    return this.http.delete<IApiResSubTask>(
      `http://localhost:8080/api/v1/subtask/delete/${id}`
    );
  }
}
