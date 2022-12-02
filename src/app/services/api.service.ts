import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }
  postProject(data: any) {
    return this.http.post<any>("http://localhost:3000/project/", data)
  }
  getProject() {
    return this.http.get("http://localhost:3000/project/")
  }
  putProject(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/project/" + id, data)
  }
  deleteProject(id: number) {
    return this.http.delete("http://localhost:3000/project/" + id)
  }
}
