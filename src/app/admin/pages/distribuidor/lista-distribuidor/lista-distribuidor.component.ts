import { Component, OnInit } from '@angular/core';
import { distribuidors } from '../../../../interfaces/distribuidors';
import { distribuidorsService } from '../../../../services/distribuidors.service';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../../../services/darMode.service';


@Component({
  selector: 'app-lista-distribuidor',
  templateUrl: './lista-distribuidor.component.html'
})
export class ListaDistribuidorComponent implements OnInit {
  listDistribuidor: distribuidors[] = []
  isDarkMode: boolean = false

  constructor(
    private _distribuidorsService: distribuidorsService, 
    private toastr: ToastrService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.getListDistribuidor();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  getListDistribuidor () {
    this._distribuidorsService.getdistribuidors().subscribe((data: distribuidors[]) => {
      this.listDistribuidor = data;
    })
  }

  deleteDistribuidorS (id: number) {
    this._distribuidorsService.deletedistribuidor(id).subscribe(() => {
      this.toastr.warning('El distribuidor ha sido eliminado con exito','Advertencia')
      this.getListDistribuidor();
    })
  }


}
