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
    //Creamos array con todos los habitos llamando a la funcion getHabitos
    this.getHabitos().subscribe(habitos => {
      //Obtenemos la posicionLista del habito que queremos fijar
      let posicionLista = 0;
      for (let i = 0; i < habitos.length; i++) {
        if (habitos[i].id === id) {
          posicionLista = habitos[i].posicionLista;
        }
      }
      //Si la posicionLista es 1 no hacemos nada
      if (posicionLista === 1) {
        return;
      }
      //Recorremos el array de habitos
      for (let i = 0; i <= habitos.length; i++) {
        //Si el la posicionLista del habito es menor a la del id que queremos fijar, incrementamos su posicionLista
        if (habitos[i].posicionLista < posicionLista) {
          habitos[i].posicionLista++;
          //Llamamos a la funcion updateHabito para actualizar la posicionLista
          this.updateHabito(habitos[i].id, habitos[i]).subscribe();
        }
        //Si la posicionLista del habito es igual al id que queremos fijar, lo ponemos en la posicion 1
        else if (habitos[i].id === id) {
          habitos[i].posicionLista = 1;
          //Llamamos a la funcion updateHabito para actualizar la posicionLista
          this.updateHabito(habitos[i].id, habitos[i]).subscribe();
        }
      }
    });
  }

  resetHabito(habito: Habito): void {

      let ahora = new Date('2024-01-01T00:00:00.000+00:00');
      let ultimoReset = new Date(habito.ultimoReset);
      let debeResetear = false;
      
      this.getHabitos().subscribe(habitos => {
        for (let habito of habitos){
          switch (habito.frecuencia) {
            case 'dia':
              ultimoReset.setDate(ultimoReset.getDate() + 1);
              debeResetear = ahora >= ultimoReset;
              break;
            case 'semana':
              ultimoReset.setDate(ultimoReset.getDate() + 7);
              debeResetear = ahora >= ultimoReset;
              break;
            case 'mes':
              ultimoReset.setMonth(ultimoReset.getMonth() + 1);
              debeResetear = ahora >= ultimoReset;
              break;
            case 'ano':
              ultimoReset.setFullYear(ultimoReset.getFullYear() + 1);
              debeResetear = ahora >= ultimoReset;
              break;
          }
      
          if (debeResetear) {
            habito.cumplidos = 0;
            habito.ultimoReset = ahora;
            this.updateHabito(habito.id, habito);
          } 
        }
      });
  }
}