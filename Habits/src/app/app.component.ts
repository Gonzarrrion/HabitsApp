import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HabitComponent } from './components/habit/habit.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { EditHabitComponent } from './components/edit-habit/edit-habit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavbarComponent, SideNavbarComponent, HabitComponent, HabitFormComponent, FormsModule, EditHabitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Habits';
}
