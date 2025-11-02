/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { VehiculosListComponent } from './vehiculos-list.component';
import { Vehiculo } from '../vehiculos';
import { VehiculoService } from '../vehiculos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VehiculosListComponent', () => {
  let component: VehiculosListComponent;
  let fixture: ComponentFixture<VehiculosListComponent>;
  let vehiculoService: VehiculoService;
  let debug: DebugElement;

  const generateMockVehiculos = (): Vehiculo => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    marca: faker.vehicle.manufacturer(),
    modelo: faker.vehicle.model(),
    linea: faker.vehicle.type(),
    color: faker.color.human(),
    kilometraje: faker.number.int({ min: 0, max: 200000 }),
    imagen: faker.image.urlLoremFlickr({ category: 'transport' }),
    referencia: faker.string.alphanumeric(10)
  });

  const mockVehiculos: Vehiculo[] = Array.from({ length: 3 }, generateMockVehiculos);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosListComponent ],
      providers: [ VehiculoService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    vehiculoService = TestBed.inject(VehiculoService);
    spyOn(vehiculoService, 'getVehiculos').and.returnValue(of(mockVehiculos));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehiculos on init', () => {
    component.ngOnInit();

    expect(vehiculoService.getVehiculos).toHaveBeenCalled();
    expect(component.vehiculos).toEqual(mockVehiculos);
  });

  it('table should have 3 rows and header', () => {
    fixture.detectChanges();
    
    const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    const headerRow = fixture.debugElement.query(By.css('table thead tr'));
    
    expect(headerRow).toBeTruthy();
    expect(tableRows.length).toBe(3);
  });

  it('should correctly count vehiculos by brand', () => {
    component.vehiculos = [
      { ...generateMockVehiculos(), marca: 'Toyota' },
      { ...generateMockVehiculos(), marca: 'Honda' },
      { ...generateMockVehiculos(), marca: 'Toyota' }
    ];

    const countByBrand = component.getVehiculosCountByBrand();

    expect(countByBrand['Toyota']).toBe(2);
    expect(countByBrand['Honda']).toBe(1);
  });

});
