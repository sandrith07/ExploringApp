import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UltimasNoticiasPage } from './ultimas-noticias.page';

const routes: Routes = [
  {
    path: '',
    component: UltimasNoticiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UltimasNoticiasPageRoutingModule {}
