import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'mapa',
        loadChildren: () => import('../mapa/mapa.module').then(m => m.MapaPageModule)
      },
      {
        path: 'ultimas-noticias',
        loadChildren: () => import('../ultimas-noticias/ultimas-noticias.module').then(m => m.UltimasNoticiasPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'musica',
        loadChildren: () => import('../musica/musica.module').then(m => m.MusicaPageModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('../eventos/eventos.module').then(m => m.EventosPageModule)
      },
      {
        path: 'negocio',
        loadChildren: () => import('../negocio/negocio.module').then(m => m.NegocioPageModule)
      },
      {
        path: 'sitios-turisticos',
        loadChildren: () => import('../sitios-turisticos/sitios-turisticos.module').then(m => m.SitiosTuristicosPageModule)
      },
      {
        path: 'historia',
        loadChildren: () => import('../historia/historia.module').then(m => m.HistoriaPageModule)
      },
      {
        path: 'registrar-eventos',
        loadChildren: () => import('../registrar-eventos/registrar-eventos.module').then(m => m.RegistrarEventosPageModule)
      },
      {
        path: 'noticia',
        loadChildren: () => import('../noticia/noticia.module').then(m => m.NoticiaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/ultimas-noticias',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ultimas-noticias',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
