import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarEventosPage } from './registrar-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarEventosPageRoutingModule {}
