import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { HabitosService } from '../../servicios/habito.service';
import { Habito } from '../../models/habito';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, TopNavbarComponent, SideNavbarComponent, HttpClientModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  private router:Router;

  habitos: Habito[] = [];

  constructor(private habitosService: HabitosService){
    
    this.router = inject(Router);
  }

  ngOnInit() {
    this.habitosService.getHabitos().subscribe(habitos => {
      this.habitos = habitos;
    });
  }
}
