import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SitioTuristico } from '../interfaces/sitioturistico.interface';

@Injectable({
  providedIn: 'root'
})
export class SitioturisticoService {
  private sitioTuristicoCollection: AngularFirestoreCollection<SitioTuristico>;
  private sitiosTuristicos: Observable<SitioTuristico[]>;

  constructor(public db: AngularFirestore) {
    /*cargar los datos de la tabla*/
    this.sitioTuristicoCollection = db.collection<SitioTuristico>('sitioturistico');
    this.sitiosTuristicos = this.sitioTuristicoCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const nombre = a.payload.doc.id;
          return {nombre, ...data};
        });
      }
    ));
  }

  getSitiosTuristicos() {
    return this.sitiosTuristicos;
  }

  getSitioTuristico(nombre: string ) {
    return this.sitioTuristicoCollection.doc<SitioTuristico>(nombre).valueChanges();
  }

  updateSitioTuristico(sitioTuristico: SitioTuristico, nombre: string) {
    return this.sitioTuristicoCollection.doc(nombre).update(sitioTuristico);

  }

  addSitioTuristico(sitioTuristico: SitioTuristico) {
    return this.sitioTuristicoCollection.add(sitioTuristico);
  }

  removeSitioTuristico(nombre: string) {
    return this.sitioTuristicoCollection.doc(nombre).delete;
  }
}
