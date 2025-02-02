// avisame.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../interfaces/cliente';
import { HttpErrorResponse } from '@angular/common/http';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-avisame',
  templateUrl: './avisame.component.html',
  styles: ``
})
export class AvisameComponent implements OnInit {
  isDarkMode: boolean = false;
  formCliente: FormGroup;

  constructor(private fb: FormBuilder,
              private _clienteService: ClienteService,
              private router: Router,
              private toastr: ToastrService,
              private _errorService: ErrorService,
              private darkModeService: DarkModeService
            ) {

    this.formCliente = this.fb.group({
      id: [0],
      Nom_Client: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(1)]],
      Email_Client: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1), Validators.email]],
    });
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  

  agregarCliente() {
    const cliente: Cliente = {
      Nom_Client: this.formCliente.value.Nom_Client,
      Email_Client: this.formCliente.value.Email_Client,
    };

    this._clienteService.saveCliente(cliente).subscribe(() => {
      this.toastr.success('Correo registrado correctamente. Se ha enviado un correo de confirmación.', 'Agregado');
      this.router.navigate(['/sr-macondo/avisame']);
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
      this._errorService.msgError(error);
      // Manejar error: mostrar mensaje de error, etc.
    });
  }
}
