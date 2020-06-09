import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleNegocioPageRoutingModule } from './detalle-negocio-routing.module';

import { DetalleNegocioPage } from './detalle-negocio.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleNegocioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleNegocioPage]
})
export class DetalleNegocioPageModule {}
