import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculos';
import { VehiculoService } from '../vehiculos.service';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css']
})
export class VehiculosListComponent implements OnInit {
  vehiculos: Array<Vehiculo> = [];

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(){
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
    });
  }

  getVehiculosCountByBrand(): { [marca: string]: number } {
    const countByBrand: { [marca: string]: number } = {};
    this.vehiculos.forEach(vehiculo => {
      if (countByBrand[vehiculo.marca]) {
        countByBrand[vehiculo.marca]++;
      } else {
        countByBrand[vehiculo.marca] = 1;
      }
    });
    return countByBrand;
  }

  ngOnInit() {
    this.getVehiculos();
  }

}
