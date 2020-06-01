import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'ultimas-noticias',
    loadChildren: () => import('./pages/ultimas-noticias/ultimas-noticias.module').then( m => m.UltimasNoticiasPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'sitios-turisticos',
    loadChildren: () => import('./pages/sitios-turisticos/sitios-turisticos.module').then( m => m.SitiosTuristicosPageModule)
  },
 {
    path: 'musica',
    loadChildren: () => import('./pages/musica/musica.module').then( m => m.MusicaPageModule)
  },
  {
    path: 'negocio',
    loadChildren: () => import('./pages/negocio/negocio.module').then( m => m.NegocioPageModule)
  },
  {
    path: 'historia',
    loadChildren: () => import('./pages/historia/historia.module').then( m => m.HistoriaPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },  {
    path: 'registrar-eventos',
    loadChildren: () => import('./pages/registrar-eventos/registrar-eventos.module').then( m => m.RegistrarEventosPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
