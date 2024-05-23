export interface Habito {
  _id?: string;
  id: number;
  nombre: string;
  descripcion: string;
  progreso: number;
  cumplidos: number;
  meta: number;
  frecuencia: Frecuencia;
  posicionLista: number;
  ultimoReset: Date;
}

export enum Frecuencia {
  Dia = 'dia',
  Semana = 'semana',
  Mes = 'mes',
  Ano = 'ano'
}