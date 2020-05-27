import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UltimasNoticiasPageRoutingModule } from './ultimas-noticias-routing.module';

import { UltimasNoticiasPage } from './ultimas-noticias.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UltimasNoticiasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UltimasNoticiasPage]
})
export class UltimasNoticiasPageModule {}
