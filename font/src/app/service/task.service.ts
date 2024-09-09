import { HttpClient, HttpParams } from '@angular/common/http';
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
    limit: number | undefined,
    createTime: string | null,
    updateTime: string | null
  ): Observable<IApiResTask> {
    let params = new HttpParams();

    params = params
      .set('name', name)
      .set('priority', priority)
      .set('page', page);
    if (idStatus) {
      params = params.set('idStatus', idStatus);
    }
    if (limit) {
      params = params.set('limit', limit);
    }
    if (createTime) {
      params = params.set('createTime', createTime);
    }
    if (updateTime) {
      params = params.set('updateTime', updateTime);
    }

    return this.http.get<IApiResTask>(
      `http://localhost:8080/api/v1/task/getAll`,
      { params }
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
