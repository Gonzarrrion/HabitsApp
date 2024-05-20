import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habito } from '../models/habito'; 
import { apiResponse } from '../interfaces/habito';

@Injectable({
  providedIn: 'root'
})

export class HabitosService {
  private habitos: Habito[] = [];

  private apiUrl = 'http://localhost:3000/api/habitos'; 

  constructor(private http: HttpClient) { }

  getHabitos(): Observable<Habito[]> {
    return this.http.get<Habito[]>(this.apiUrl);
  }

  getHabitoById(id: number): Observable<Habito> {
    return this.http.get<Habito>(`${this.apiUrl}/${id}`);
  }

  addHabito(habito: Habito): Observable<Habito> {
    return this.http.post<Habito>(this.apiUrl, habito);
  }

  updateHabito(id: number, habito: Habito): Observable<Habito> {
    return this.http.put<Habito>(`${this.apiUrl}/${id}`, habito);
  }

  deleteHabito(id: number): Observable<Habito> {
    return this.http.delete<Habito>(`${this.apiUrl}/${id}`);
  }

  fijarHabito(id: number): Observable<void> {
    return new Observable<void>(subscriber => {
      this.getHabitoById(id).subscribe(habito => {
        if (habito) {
          habito.posicionLista = 1;
          this.habitos.forEach(h => {
            if (h.id !== habito.id) {
              h.posicionLista++;
              this.updateHabito(h.id, h).subscribe(); // Actualiza la base de datos
            }
          });
          subscriber.next();
          subscriber.complete();
        }
      });
    });
  }
}