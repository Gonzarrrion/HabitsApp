import { Component, OnInit, inject, NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { HabitosService } from '../../servicios/habito.service';
import { Habito } from '../../models/habito';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component'; 
import { SideNavbarComponent } from '../side-navbar/side-navbar.component'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, TopNavbarComponent, SideNavbarComponent, HttpClientModule],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.css'
})

export class HabitComponent implements OnInit {
  habitos: Habito[] = [];

  constructor(private router: Router, private habitosService: HabitosService) { }

  ngOnInit() {
    this.habitosService.getHabitos().subscribe(habitos => {
      this.habitos = habitos.sort((a, b) => a.posicionLista - b.posicionLista);
    });
  }
  
  fijarHabito(event: Event, id: number) {
    event.preventDefault();
    this.habitosService.fijarHabito(id).subscribe(() => {
      this.habitosService.getHabitos().subscribe(habitos => {
        this.habitos = habitos.sort((a, b) => a.posicionLista - b.posicionLista);
      });
    });
  }
  
  eliminarHabito(event: Event, id: number) {
    event.preventDefault();
    this.habitosService.deleteHabito(id).subscribe(() => {
      this.habitosService.getHabitos().subscribe(habitos => {
        this.habitos = habitos.sort((a, b) => a.posicionLista - b.posicionLista);
      });
    });
  }

  editHabito(habitoId: number) {
    this.router.navigate(['/edit-habit', habitoId]);
  }
}
