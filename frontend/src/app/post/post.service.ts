import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "http://127.0.0.1:8000/api/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + 'peticiones/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllByUser(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + 'mispeticiones/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post: FormData): Observable<Post> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<Post>(this.apiURL + 'peticiones/', post, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + 'peticiones/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + 'peticiones/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Post>(this.apiURL + 'peticiones/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  firmar(id: Number) {
    return this.httpClient.put<Post>(this.apiURL + 'peticiones/firmar/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
}