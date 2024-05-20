import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Habito } from '../../models/habito';
import { HabitosService } from '../../servicios/habito.service';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule, RouterLink, TopNavbarComponent, SideNavbarComponent, HttpClientModule],
  templateUrl: './habit-form.component.html',
  styleUrl: './habit-form.component.css'
})

export class HabitFormComponent implements OnInit{

  habito: Habito = {} as Habito; 

  constructor(private router: Router, private habitosService: HabitosService) { }

  addHabito() {
    this.habitosService.addHabito(this.habito).subscribe(() => {
      this.router.navigate(['/habits']);
    });
  }

  ngOnInit(): void { }
}
