export interface Habito {
  _id?: string;
  id: number;
  nombre: string;
  descripcion: string;
  progreso: number;
  cumplidos: number;
  meta: number;
  frecuencia: string;
  visualizacion: string;
  posicionLista: number;
  ultimoReset: Date;
}

export enum Frecuencia {
  Dia = 'Dia',
  Semana = 'Semana',
  Mes = 'Mes'
}

export enum Visualizacion {
  Tick = 'Tick',
  Porcentaje = 'Porcentaje'
}