import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../../../services/sucursal.service';
import { Sucursal } from '../../../../interfaces/sucursal';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-lista-sucursal',
  templateUrl: './lista-sucursal.component.html',
  styles: ``
})
export class ListaSucursalComponent implements OnInit{
  ListSucursal: Sucursal[] = []
  isDarkMode: boolean = false;

  constructor(
    private _sucursalService: SucursalService,
    private darkModeService: DarkModeService
  ) { }
  ngOnInit(): void{
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  

  this.getListSucursal();
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getListSucursal(){
    this._sucursalService.getListSucursal().subscribe((data:Sucursal[])=> {
      this.ListSucursal = data;
    })
  }

}
