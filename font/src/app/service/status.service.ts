import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResStatus, IStatus } from '../interface/status.interface';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}
  getAllStatus(
    name: string,
    page: number,
    limit: number | undefined
  ): Observable<IApiResStatus> {
    let params = new HttpParams();
    params = params.set('name', name).set('page', page);
    if (limit) {
      params = params.set('limit', limit);
    }
    return this.http.get<IApiResStatus>(
      `http://localhost:8080/api/v1/status/getAll`,
      { params }
    );
  }
  createStatus(status: Omit<IStatus, 'id'>): Observable<IApiResStatus> {
    return this.http.post<IApiResStatus>(
      `http://localhost:8080/api/v1/status/create`,
      status
    );
  }
  updateStatus(status: IStatus): Observable<IApiResStatus> {
    return this.http.put<IApiResStatus>(
      `http://localhost:8080/api/v1/status/update/${status.id}`,
      status
    );
  }
  deleteStatus(id: number): Observable<IApiResStatus> {
    return this.http.delete<IApiResStatus>(
      `http://localhost:8080/api/v1/status/delete/${id}`
    );
  }
}
