import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cancion } from './cancion';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private apiURL = "http://127.0.0.1:8000/api/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Cancion[]> {
    return this.httpClient.get<Cancion[]>(this.apiURL + 'canciones/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

 

  create(post: FormData): Observable<Cancion> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<Cancion>(this.apiURL + 'canciones/', post, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Cancion> {
    return this.httpClient.get<Cancion>(this.apiURL + 'canciones/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Cancion): Observable<Cancion> {
    return this.httpClient.put<Cancion>(this.apiURL + 'canciones/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Cancion>(this.apiURL + 'canciones/' + id, this.httpOptions)
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
 
}