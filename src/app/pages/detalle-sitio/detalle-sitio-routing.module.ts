import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleSitioPage } from './detalle-sitio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleSitioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleSitioPageRoutingModule {}
