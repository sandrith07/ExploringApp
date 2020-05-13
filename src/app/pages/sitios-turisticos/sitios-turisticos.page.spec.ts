import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SitiosTuristicosPage } from './sitios-turisticos.page';

describe('SitiosTuristicosPage', () => {
  let component: SitiosTuristicosPage;
  let fixture: ComponentFixture<SitiosTuristicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitiosTuristicosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SitiosTuristicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
