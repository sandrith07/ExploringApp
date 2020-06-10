import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';





@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    InicioSesionComponent,
    PerfilComponent,


  ],
  exports:[
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    InicioSesionComponent,
    PerfilComponent,


  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
