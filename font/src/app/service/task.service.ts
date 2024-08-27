import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResTask, ITask } from '../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getAllTask(
    name: string,
    priority: string,
    idStatus: number,
    page: number,
    limit: number | undefined
  ): Observable<IApiResTask> {
    if (idStatus == null || idStatus == undefined) {
      if (limit == null || limit == undefined) {
        return this.http.get<IApiResTask>(
          `http://localhost:8080/api/v1/task/getAll?name=${name}&priority=${priority}&page=${page}`
        );
      } else {
        return this.http.get<IApiResTask>(
          `http://localhost:8080/api/v1/task/getAll?name=${name}&priority=${priority}&page=${page}&limit=${limit}`
        );
      }
    }
    if (limit == null || limit == undefined) {
      return this.http.get<IApiResTask>(
        `http://localhost:8080/api/v1/task/getAll?name=${name}&priority=${priority}&idStatus=${idStatus}&page=${page}`
      );
    }
    return this.http.get<IApiResTask>(
      `http://localhost:8080/api/v1/task/getAll?name=${name}&priority=${priority}&idStatus=${idStatus}&page=${page}&limit=${limit}`
    );
  }
  createTask(task: Omit<ITask, 'id'>): Observable<IApiResTask> {
    return this.http.post<IApiResTask>(
      `http://localhost:8080/api/v1/task/create`,
      task
    );
  }
  updateTask(task: ITask): Observable<IApiResTask> {
    return this.http.put<IApiResTask>(
      `http://localhost:8080/api/v1/task/update/${task.id}`,
      task
    );
  }
  deleteTask(id: number): Observable<IApiResTask> {
    return this.http.delete<IApiResTask>(
      `http://localhost:8080/api/v1/task/delete/${id}`
    );
  }
}
