import { Component } from '@angular/core';
import { ToastController} from '@ionic/angular';
import {PopoverController} from '@ionic/angular'
import { PopoverComponent } from '../../components/popover/popover.component';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private toastCtrl: ToastController,
    public popoverController: PopoverController,
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

  async presentPopover(evento) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {

      },
      cssClass: 'my-custom-class',
      event: evento,
      translucent: true
    });
    return await popover.present();
  }

  /* toggleReorder() {
    const reorderGroup = document.getElementById('reorder');
    reorderGroup.disabled = !reorderGroup.disabled;
    reorderGroup.addEventListener('ionItemReorder', ({detail}) => {
      detail.complete(true);
    });
  }*/
}
