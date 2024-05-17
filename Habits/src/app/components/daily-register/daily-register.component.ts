import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Habito, HabitoService } from '../../servicios/habito.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-register',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, TopNavbarComponent, SideNavbarComponent, FormsModule],
  templateUrl: './daily-register.component.html',
  styleUrl: './daily-register.component.css'
})
export class DailyRegisterComponent implements OnInit{
  
  habitos: Habito[] = [];

  constructor(private habitoService: HabitoService) { }

  ngOnInit() {
    this.habitos = this.habitoService.getHabitos();
  }

  registrarCumplimiento(event: Event, habito: Habito) {
    event.preventDefault();
    habito.progreso += (habito.cumplidos / habito.meta) * 100;
    if (habito.progreso > 100) {
      habito.progreso = 100;
    }
    this.habitos = [...this.habitoService.getHabitos()];
  }
}
