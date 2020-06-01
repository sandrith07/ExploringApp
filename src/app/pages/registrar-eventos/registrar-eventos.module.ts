import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarEventosPageRoutingModule } from './registrar-eventos-routing.module';

import { RegistrarEventosPage } from './registrar-eventos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarEventosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistrarEventosPage]
})
export class RegistrarEventosPageModule {}
