import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HabitComponent } from './components/habit/habit.component';
import { HabitFormComponent } from './components/habit-form/habit-form.component';
import { DailyRegisterComponent } from './components/daily-register/daily-register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { EditHabitComponent } from './edit-habit/edit-habit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/habits', pathMatch: 'full' },
    { path: 'habits', component: HabitComponent },
    { path: 'add-habit', component: HabitFormComponent },
    { path: 'edit-habit/:id', component: EditHabitComponent }, // Reutiliza HabitForm para edición
    { path: 'daily-register', component: DailyRegisterComponent },
    { path: 'reports', component: ReportsComponent },
    { path: '**', redirectTo: '/habits' } // Redirecciona rutas desconocidas a la lista de hábitos

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
