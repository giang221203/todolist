import { HttpClient, HttpParams } from '@angular/common/http';
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
    limit: number | undefined,
    createTime: string | null,
    updateTime: string | null
  ): Observable<IApiResSubTask> {
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
    return this.http.get<IApiResSubTask>(
      `http://localhost:8080/api/v1/subtask/getbyidtask/${idTask}`,
      { params }
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
