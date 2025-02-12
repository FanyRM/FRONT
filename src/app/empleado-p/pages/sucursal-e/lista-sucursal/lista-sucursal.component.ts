import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../../../interfaces/sucursal';
import { SucursalService } from '../../../../services/sucursal.service';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-sucursal',
  templateUrl: './lista-sucursal.component.html',
  styles: ``
})
export class ListaSucursalComponent implements OnInit{
  listSucursal: Sucursal[] = []
  isDarkMode: boolean = false;

  constructor(private _sucursalService: SucursalService, private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.getListSucursal();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getListSucursal () {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.listSucursal = data;
    })
  }
}
