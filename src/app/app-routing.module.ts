import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialTableComponent } from './material-table/material-table.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
