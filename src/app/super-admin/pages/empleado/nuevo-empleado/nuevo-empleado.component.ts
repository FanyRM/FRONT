import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../../../interfaces/empleado';
import { Sucursal } from '../../../../interfaces/sucursal';
import { EmpleadoService } from '../../../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalService } from '../../../../services/sucursal.service';
import { RolService } from '../../../../services/rol.service';
import { Rol } from '../../../../interfaces/rol';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DarkModeService } from '../../../../services/darMode.service';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styles: ``
})
export class NuevoEmpleadoComponent implements OnInit {

  formAddEmpleado: FormGroup;
  id: number;
  operacion: string = 'Agregar ';
  roles: any[] = [];
  sucursales: any[] = [];
  isDarkMode: boolean = false;

  constructor( private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _empleadoService: EmpleadoService,
    private _sucursalService: SucursalService,
    private _rolService: RolService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private darkModeService: DarkModeService
    ) {
      this.formAddEmpleado = this.fb.group({
        Emp_Nom: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
        Ape_Pat: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
        Ape_Mat: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
        Edad: ['', [Validators.required, Validators.min(15), Validators.max(99)]],
        Emp_Telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
        Emp_Email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1), Validators.email]],
        Contrasenia: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
        Estado: ['', [Validators.required]],
        IDRol: ['', [Validators.required]],
        IDSucursal: ['', [Validators.required]]
      })

      this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    if(this.id != 0) {
      //Es editar
      this.operacion = 'Editar ';
      this.getEmpleado(this.id);
    }
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
    this.getListRol ();
    this.getListSucursal();

  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }


  getListRol () {
    this._rolService.getListRol().subscribe((data: Rol[]) => {
      this.roles = data;
    }, (error: HttpErrorResponse) => {
      console.error('Error', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    })
  }

  getListSucursal () {
    this._sucursalService.getListSucursal().subscribe((data: Sucursal[]) => {
      this.sucursales = data;
    }, (error: HttpErrorResponse) => {
      console.error('Error', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    })
  }

  getEmpleado (id: number) {
    this._empleadoService.getEmpleado(id).subscribe((data: Empleado) => {
      this.formAddEmpleado.patchValue ({
        id: data.id,
        Emp_Nom: data.Emp_Nom,
        Ape_Pat: data.Ape_Pat,
        Ape_Mat: data.Ape_Mat,
        Edad: data.Edad,
        Emp_Telefono: data.Emp_Telefono,
        Emp_Email: data.Emp_Email,
        Contrasenia: data.Contrasenia,
        Estado: data.Estado,
        IDRol: data.IDRol,
        IDSucursal: data.IDSucursal

      })

    }, (error: HttpErrorResponse) => {
      console.error('Error', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    })
  }

  agregarEmpleado () {
    const empleado: Empleado = {
      Emp_Nom: this.formAddEmpleado.value.Emp_Nom,
      Ape_Pat: this.formAddEmpleado.value.Ape_Pat,
      Ape_Mat: this.formAddEmpleado.value.Ape_Mat,
      Edad: this.formAddEmpleado.value.Edad,
      Emp_Telefono: this.formAddEmpleado.value.Emp_Telefono,
      Emp_Email: this.formAddEmpleado.value.Emp_Email,
      Contrasenia: this.formAddEmpleado.value.Contrasenia,
      Estado: this.formAddEmpleado.value.Estado,
      IDRol: this.formAddEmpleado.value.IDRol,
      IDSucursal: this.formAddEmpleado.value.IDSucursal
    }

    if(this.id !==0 ){
      //Es editar
      this._empleadoService.updateEmpleado(this.id, empleado).subscribe(() => {
        this.router.navigate(['/super-admin/empleados'])
      }, (error: HttpErrorResponse) => {
        console.error('Error', error);
        this.toastr.success('Empleado actualizado correctamente', 'Actualizado')
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    } else {
      //Es agregar
      this._empleadoService.saveEmpleado(empleado).subscribe(() => {
        this.toastr.success('Empleado agregado correctamente', 'Agregado')
        this.router.navigate(['/super-admin/empleados'])
      }, (error: HttpErrorResponse) => {
        console.error('Error', error);
        this._errorService.msgError(error);
        // Manejar error: mostrar mensaje de error, etc.
      })
    }
  }

}
