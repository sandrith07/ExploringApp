import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleSitioPageRoutingModule } from './detalle-sitio-routing.module';

import { DetalleSitioPage } from './detalle-sitio.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleSitioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleSitioPage]
})
export class DetalleSitioPageModule {}
