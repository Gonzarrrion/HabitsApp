import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { HabitosService } from '../../servicios/habito.service';
import { Habito } from '../../models/habito';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-daily-register',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, TopNavbarComponent, SideNavbarComponent, FormsModule, HttpClientModule],
  templateUrl: './daily-register.component.html',
  styleUrl: './daily-register.component.css'
})
export class DailyRegisterComponent implements OnInit{
  
  habitos: Habito[] = [];
  valoresCumplidos: {[key: number]: number} = {};
  constructor(private habitosService: HabitosService) { }

  ngOnInit() {
    this.habitosService.getHabitos().subscribe(habitos => {
      this.habitos = habitos;
    });
  }

  registrarCumplimiento(event: Event, habito: Habito) {
    event.preventDefault();
    let valorCumplido = this.valoresCumplidos[habito.id];
    if (habito.cumplidos + valorCumplido <= habito.meta) {
      habito.cumplidos += valorCumplido;
      habito.progreso += (valorCumplido / habito.meta) * 100;
      if (habito.progreso > 100) {
        habito.progreso = 100;
      }
      this.habitosService.updateHabito(habito.id, habito).subscribe(() => {
        this.habitosService.getHabitos().subscribe(habitos => {
          this.habitos = habitos;
        });
      });
    } else {
      alert('El valor ingresado sobrepasa la meta');
    }
  }
}
