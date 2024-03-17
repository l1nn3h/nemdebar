import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DrinksComponent} from './components/drinks/drinks.component';

const routes: Routes = [
  {path: '**', component: DrinksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
