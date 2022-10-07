import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskResponse } from '../models/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  fetchDataAsPromise(): Promise<TaskResponse> {
    return this.httpClient.get<TaskResponse>('../assets/mock-data.json')
      .toPromise();
  }
}
