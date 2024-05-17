import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Habito, HabitoService } from '../../servicios/habito.service';
import { TopNavbarComponent } from '../../top-navbar/top-navbar.component';
import { SideNavbarComponent } from '../../side-navbar/side-navbar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink, CommonModule, NgFor, TopNavbarComponent, SideNavbarComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  private router:Router;

  habitos: Habito[] = [];

  constructor(private habitoService: HabitoService){
    
    this.router = inject(Router);
  }

  ngOnInit() {
    this.habitos = this.habitoService.getHabitos();
  }
}
