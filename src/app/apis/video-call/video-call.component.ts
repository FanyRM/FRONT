import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../interfaces/empleado';
import { ToastrService } from 'ngx-toastr';
import { DarkModeService } from '../../services/darMode.service';

declare global {
  interface Window {
    DailyIframe: any;
  }
}

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css'],
})
export class VideoCallComponent implements OnInit {
  dailyCallFrame: any;
  empleados: Empleado[] = [];
  roomUrl: string = '';
  isDarkMode: boolean = false;
  showModal: boolean = false;

  constructor(private toastr: ToastrService, private empleadoService: EmpleadoService, private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.createRoomAndInitializeCall();
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }


  async createRoomAndInitializeCall(): Promise<void> {
    try {
      const apiKey = '716019a875f838601669589b0588c20da8f2ce4ced8b49cea6bfe72f4b6e2b38';
      const response = await axios.post(
        'https://api.daily.co/v1/rooms',
        {
          properties: {
            exp: Math.round(Date.now() / 1000) + 3600,
            enable_knocking: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      this.roomUrl = response.data.url;

      this.dailyCallFrame = window.DailyIframe.createFrame({
        showLeaveButton: true,
        iframeStyle: {
          position: 'relative',
          width: '100%',
          height: '100%',
          border: '0',
        },
      });

      this.dailyCallFrame.join({ url: this.roomUrl });
      const videoContainer = document.getElementById('video-container');
      this.toastr.info('Sala de videoconferencia activa', 'Bienvenido')
      videoContainer?.appendChild(this.dailyCallFrame.iframe());
    } catch (error) {
      this.toastr.error('Error al crear la sala', 'Error');
    }
  }

  getEmpleados(): void {
    this.empleadoService.getListEmpleado().subscribe(
      (data) => {
        this.empleados = data.map((empleado) => ({ ...empleado, selected: false })); // Agrega propiedad 'selected'
      },
      (error) => console.error('Error al obtener empleados:', error)
    );
  }

  /*async sendInvitations(): Promise<void> {
    const selectedEmails = this.empleados
      .filter((empleado) => empleado.selected)
      .map((empleado) => empleado.Emp_Email);

    if (selectedEmails.length === 0) {
      alert('Selecciona al menos un empleado');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/emails', {
        emails: selectedEmails,
        subject: 'Invitación a una reunión',
        body: `Has sido invitado a una reunión. Únete usando este enlace: ${this.roomUrl}`,
      });
      alert('Invitaciones enviadas con éxito');
    } catch (error) {
      console.error('Error al enviar invitaciones:', error);
    }
  } */

    toggleModal(): void {
      this.showModal = !this.showModal;
    }

    selectAllEmpleados(select: boolean): void {
      this.empleados.forEach((empleado) => (empleado.selected = select));
    }

    async sendInvitations(): Promise<void> {
      const selectedEmployees = this.empleados.filter((empleado) => empleado.selected);
      const selectedEmails = selectedEmployees.map((empleado) => empleado.Emp_Email);

      if (selectedEmails.length === 0) {
        this.toastr.warning('Debe seleccionar al menos un empleado.', 'Aviso');
        return;
      }

      const employeeNames = selectedEmployees.map((empleado) => `${empleado.Emp_Nom} ${empleado.Ape_Pat}`).join(', ');

      const messageBody = `
        Estimado(a) empleado(a),

        Es un placer invitarle a una videoconferencia que se llevará a cabo en nuestra plataforma en línea.</p>
        Detalles de la reunión:

        Tema: Sala de reuniones
        Enlace para unirse:${this.roomUrl}

        Reglas de la videollamada:
        Mantener el micrófono apagado cuando no esté hablando para evitar interferencias.
        Vestir de manera adecuada y profesional, ya que es una reunión formal.
        Evitar distracciones y participar en un entorno adecuado para garantizar la concentración.

        Le agradecemos su atención a estas reglas para mantener un ambiente de respeto y profesionalismo durante la llamada.

        Quedamos a su disposición para cualquier consulta previa a la reunión.

        Saludos cordiales,
        SR. MACONDO
      `;

      try {
        await axios.post('http://localhost:3000/api/emails', {
          emails: selectedEmails,
          subject: 'Invitación a videoconferencia: Sala de reuniones',
          body: messageBody,
        });
        this.toastr.success(
          `Invitaciones enviadas con éxito a: ${employeeNames}.`,
          'Éxito'
        );
        this.selectAllEmpleados(false); // Deseleccionar a todos los empleados
        this.toggleModal(); // Cerrar el modal
      } catch (error) {
        this.toastr.error('No se pudieron enviar las invitaciones.', 'Error');
        console.error('Error al enviar invitaciones:', error);
      }
    }

  leaveCall(): void {
    this.dailyCallFrame.leave();
  }
}
