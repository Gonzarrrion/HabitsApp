import { Component, OnInit, Input } from '@angular/core';
import { HabitoService, Habito, Frecuencia, Visualizacion } from '../../servicios/habito.service';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-habit',
  standalone: true,
  imports: [SideNavbarComponent, TopNavbarComponent, FormsModule],
  templateUrl: './edit-habit.component.html',
  styleUrl: './edit-habit.component.css'
})
export class EditHabitComponent implements OnInit{
  
  habito: Habito | null | undefined = null;
  habitoNuevo: Habito = {
    id: 0,
    nombre: '',
    descripcion: '',
    progreso: 0,
    cumplidos: 0,
    meta: 0,
    frecuencia: Frecuencia.Dia,
    visualizacion: Visualizacion.Tick,
    posicionLista: 0,
    ultimoReset: new Date()
  };

  constructor(private habitoService: HabitoService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // Obtén el id del hábito de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Usa el id para obtener los datos del hábito
      this.habito = this.habitoService.getHabitoById(+id);
      if (this.habito !== undefined) {
        // Inicializa habitoNuevo con una copia de habito
        this.habitoNuevo = { ...this.habito };
      } else {
        // Maneja el caso en que getHabitoById() devuelva undefined
      }
    }
  }

  editHabito(): void {
    if (this.habito && this.habitoNuevo) {
      // Si la meta del habitoNuevo es diferente de la meta del habito original
      if (this.habitoNuevo.meta !== this.habito.meta) {
        // Calcula el nuevo progreso como una proporción del progreso original al nuevo objetivo
        // Asi si aumenta la meta el progreso actual seria menor iviceversa
        this.habitoNuevo.progreso = this.habito.progreso * ( this.habito.meta / this.habitoNuevo.meta ); // 30*(10/20)
      }
      // Usa el id del hábito para editar el hábito con los datos de habitoNuevo
      this.habitoService.editHabito(this.habito.id, this.habitoNuevo);
      this.router.navigate(['/habits']);
    }
  }
}
  
