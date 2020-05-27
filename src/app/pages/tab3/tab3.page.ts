import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private toastCtrl: ToastController
  ) {}
  accion = 'todos';
  visible = false;

  toggle() {
   this.visible = !this.visible;
   if(this.visible === false){
    this.showToast('eliminado');
   }else if(this.visible === true){
    this.showToast('Añadido');
   }
  }

  async  showToast(estado : any){
    if(estado === 'eliminado'){
      await this.toastCtrl.create({
        message: 'Eliminado de favoritos',
        duration: 900,
        position: 'middle'
      }).then(res => res.present());
    }else{
      await this.toastCtrl.create({
        message: 'Añadido a favoritos',
        duration: 900,
        position: 'middle'
      }).then(res => res.present());
    }
  }
}
