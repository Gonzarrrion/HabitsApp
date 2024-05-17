import { Injectable } from '@angular/core';

export enum Visualizacion {
  Tick = 'tick',
  Barra = 'barra'
}

export enum Frecuencia {
  Dia = 'dia',
  Semana = 'semana',
  Mes = 'mes',
  Ano = 'ano'
}

export interface Habito {
  id: number;
  nombre: string;
  descripcion: string;
  progreso: number;
  cumplidos: number;
  meta: number;
  frecuencia: Frecuencia;
  visualizacion: Visualizacion;
  posicionLista: number;
  ultimoReset: Date;
}

@Injectable({
  providedIn: 'root'
})

export class HabitoService {
  habitos: Habito[] = [];

  constructor() 
  { 
    this.cargarHabitos();
  }

  getHabitos() {
    return this.habitos;
  }

  cargarHabitos() {
    const habitosAlmacenados = localStorage.getItem('habitos');
    if (!habitosAlmacenados) {
      this.habitos = [
        {
          id: 1,
          nombre: 'Habito 1',
          descripcion: 'Descripcion del habito 1',
          progreso: 0,
          cumplidos: 0,
          meta: 10,
          frecuencia: Frecuencia.Dia,
          visualizacion: Visualizacion.Tick,
          posicionLista: 1,
          ultimoReset: new Date()
        },
        {
          id: 2,
          nombre: 'Habito 2',
          descripcion: 'Descripcion del habito 2',
          progreso: 0,
          cumplidos: 0,
          meta: 20,
          frecuencia: Frecuencia.Semana,
          visualizacion: Visualizacion.Barra,
          posicionLista: 2,
          ultimoReset: new Date()
        },
        {
          id: 3,
          nombre: 'Habito 3',
          descripcion: 'Descripcion del habito 3',
          progreso: 0,
          cumplidos: 0,
          meta: 15,
          frecuencia: Frecuencia.Mes,
          visualizacion: Visualizacion.Tick,
          posicionLista: 3,
          ultimoReset: new Date()
        },
        {
          id: 4,
          nombre: 'Habito 4',
          descripcion: 'Descripcion del habito 4',
          progreso: 0,
          cumplidos: 0,
          meta: 5,
          frecuencia: Frecuencia.Ano,
          visualizacion: Visualizacion.Barra,
          posicionLista: 4,
          ultimoReset: new Date()
        }
      ];
      this.guardarHabitos();
    } else {
      this.habitos = habitosAlmacenados ? JSON.parse(habitosAlmacenados) : [];
      this.habitos.sort((a, b) => a.posicionLista - b.posicionLista);
    }
  }

  private guardarHabitos() {
    localStorage.setItem('habitos', JSON.stringify(this.habitos));
  }

  fijarHabito(id: number) {
    const habito = this.getHabitoById(id);
    if (habito) {
      // Guarda la posición original del hábito
      const posicionOriginal = habito.posicionLista;
  
      // Establece la posición del hábito a 1
      habito.posicionLista = 1;
  
      // Incrementa la posición de todos los otros hábitos que tienen una posición menor o igual a la posición original
      this.habitos.forEach(h => {
        if (h.id !== habito.id && h.posicionLista < posicionOriginal) {
          h.posicionLista++;
        }
      });
  
      // Ordena los hábitos por su posición
      this.habitos.sort((a, b) => a.posicionLista - b.posicionLista);
    }
  }

  addHabito(habito: Habito) {
    this.habitos.push(habito);
    this.guardarHabitos();
  }

  eliminarHabito(id: number) {
    const index = this.habitos.findIndex(h => h.id === id);
    if (index !== -1) {
      this.habitos.splice(index, 1);
    }
  }

  setHabito(id: number, habito: Habito) {
    const index = this.habitos.findIndex(h => h.id === id);
    if (index !== -1) {
      this.habitos[index] = habito;
      this.guardarHabitos();
    }
  }

  editHabito(id: number, habito: Habito) {
    const index = this.habitos.findIndex(h => h.id === id);
    if (index !== -1) {
      this.habitos[index] = { ...this.habitos[index], ...habito };
      this.guardarHabitos();
    }
  }

  getHabitoById(id: number) {
    return this.habitos.find(habito => habito.id === id);
  }
/* Logica para resetear las metas cuando pasen las fechas
  getWeek(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
  resetMeta() {
    const now = new Date();
    this.habitos.forEach(habito => {
      switch (habito.frecuencia) {
        case Frecuencia.Dia:
          if (now.getDay() !== habito.ultimoReset.getDay()) {
            habito.meta = 0;
            habito.ultimoReset = now;
          }
          break;
        case Frecuencia.Semana:
          if (this.getWeek(now) !== this.getWeek(habito.ultimoReset)) {
            habito.meta = 0;
            habito.ultimoReset = now;
          }
          break;
        case Frecuencia.Mes:
          if (now.getMonth() !== habito.ultimoReset.getMonth()) {
            habito.meta = 0;
            habito.ultimoReset = now;
          }
          break;
        case Frecuencia.Ano:
          if (now.getFullYear() !== habito.ultimoReset.getFullYear()) {
            habito.meta = 0;
            habito.ultimoReset = now;
          }
          break;
      }
    });
    this.guardarHabitos();
  }*/
}