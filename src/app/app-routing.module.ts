import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { EstablishmentDetailComponent } from './establishment-detail/establishment-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/establishments', pathMatch: 'full' },
  { path: 'establishments', component: EstablishmentsComponent },
  { path: 'establishment-detail/:id', component: EstablishmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
