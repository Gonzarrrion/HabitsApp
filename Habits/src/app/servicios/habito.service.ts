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

  getHabitoById(id: string): Observable<Habito> {
    return this.http.get<Habito>(`${this.apiUrl}/${id}`);
  }

  addHabito(habito: Habito): Observable<Habito> {
    return this.http.post<Habito>(this.apiUrl, habito);
  }

  updateHabito(id: string, habito: Habito): Observable<Habito> {
    return this.http.put<Habito>(`${this.apiUrl}/${id}`, habito);
  }

  deleteHabito(id: string): Observable<Habito> {
    return this.http.delete<Habito>(`${this.apiUrl}/${id}`);
  }

  fijarHabito(id: number): Observable<void> {
    return new Observable<void>(subscriber => {
      this.getHabitoById(id.toString()).subscribe(habito => {
        if (habito) {
          const posicionOriginal = habito.posicionLista;
          habito.posicionLista = 1;
          this.habitos.forEach(h => {
            if (h.id !== habito.id && h.posicionLista < posicionOriginal) {
              h.posicionLista++;
              this.updateHabito(h.id.toString(), h).subscribe(); // Actualiza la base de datos
            }
          });
          subscriber.next();
          subscriber.complete();
        }
      });
    });
  }
}