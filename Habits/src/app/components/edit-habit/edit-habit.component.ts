import { Component, OnInit, Input } from '@angular/core';
import { Habito, Frecuencia } from '../../models/habito';
import { HabitosService } from '../../servicios/habito.service';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-habit',
  standalone: true,
  imports: [SideNavbarComponent, TopNavbarComponent, FormsModule, HttpClientModule],
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
    posicionLista: 0,
    ultimoReset: new Date()
  };

  constructor(private habitosService: HabitosService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const habitId = Number(id);


    if (habitId) {
      this.habitosService.getHabitoById(habitId).subscribe(habito => {
        this.habito = habito;
        if (this.habito !== undefined) {
          this.habitoNuevo = { ...this.habito };
        } else {
          // Manejar el caso en que getHabitoById() devuelva undefined
        }
      });
    }
  }

  editHabito(): void {
    if (this.habito && this.habitoNuevo) {
      if (this.habitoNuevo.meta !== this.habito.meta) {
        this.habitoNuevo.progreso = this.habito.progreso * ( this.habito.meta / this.habitoNuevo.meta );
      }
      this.habitosService.updateHabito(this.habito.id, this.habitoNuevo).subscribe(() => {
        this.router.navigate(['/habits']);
      });
    }
  }
}
  
