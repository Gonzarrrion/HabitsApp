import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habito } from '../models/habito'; 
import { firstValueFrom } from 'rxjs';
import { apiResponse } from '../interfaces/habito';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  fijarHabito(id: number): void {
    this.getHabitoById(id).subscribe(habito => {
      if (habito) {
        const updates: Observable<Habito | undefined>[] = [];
        this.habitos.forEach((h, index) => {
          if (h.posicionLista <= habito.posicionLista) {
            h.posicionLista++;
            updates.push(this.updateHabito(h.id, h));
          }
        });
        habito.posicionLista = 1;
        updates.unshift(this.updateHabito(habito.id, habito));
        forkJoin(updates).subscribe(() => {
          this.getHabitos().subscribe(habitos => {
            this.habitos = habitos.sort((a, b) => a.posicionLista - b.posicionLista);
          });
        });
      }
    });
  }
}