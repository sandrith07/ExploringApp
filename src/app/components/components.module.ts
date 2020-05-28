import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';




@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    InicioSesionComponent
  ],
  exports:[
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    InicioSesionComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
