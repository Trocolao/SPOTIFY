import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Lista } from './lista';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private apiURL = "http://127.0.0.1:8000/api/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Lista[]> {
    return this.httpClient.get<Lista[]>(this.apiURL + 'listas/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllByUser(): Observable<Lista[]> {
    return this.httpClient.get<Lista[]>(this.apiURL + 'listas/mine/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(post: FormData): Observable<Lista> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<Lista>(this.apiURL + 'listas/', post, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Lista> {
    return this.httpClient.get<Lista>(this.apiURL + 'listas/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Lista): Observable<Lista> {
    return this.httpClient.put<Lista>(this.apiURL + 'listas/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Lista>(this.apiURL + 'listas/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  addSongToList(listaId: number, cancionId: number): Observable<any> {
    return this.httpClient.post(`${this.apiURL}listas/${listaId}/canciones/${cancionId}`, {});
  }

  deleteSongFromList(listaId: number, cancionId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}listas/${listaId}/canciones/${cancionId}`);
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
}
