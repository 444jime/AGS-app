import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosProyectosComponent } from './servicios-proyectos.component';

describe('ServiciosProyectosComponent', () => {
  let component: ServiciosProyectosComponent;
  let fixture: ComponentFixture<ServiciosProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosProyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
