import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Habito, HabitoService } from '../../servicios/habito.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component'; 
import { SideNavbarComponent } from '../side-navbar/side-navbar.component'
@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, TopNavbarComponent, SideNavbarComponent],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.css'
})

export class HabitComponent implements OnInit {
  habitos: Habito[] = [];

  constructor(private router: Router, private habitoService: HabitoService) { }

  ngOnInit() {
    this.habitos = JSON.parse(localStorage.getItem('habitos') as string) || [];
  }

  fijarHabito(event: Event, id: number) {
    event.preventDefault();
    this.habitoService.fijarHabito(id);
    this.habitos = [...this.habitoService.getHabitos()];
  }

  eliminarHabito(event: Event, id: number) {
    event.preventDefault();
    this.habitoService.eliminarHabito(id);
    this.habitos = [...this.habitoService.getHabitos()];
  }

  editHabito(habitoId: number) {
    this.router.navigate(['/edit-habit', habitoId]);
  }
}
