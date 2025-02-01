import { Component, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  private readonly inactivityTime = 300000; // Tiempo total de inactividad (5 minutos)
  private activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

  inactivityTimeout$ = new Subject<void>();

  constructor(private router: Router, private ngZone: NgZone, private dialog: MatDialog) {
    this.startMonitoring();
  }

  private startMonitoring() {
    this.activityEvents.forEach((event) =>
      window.addEventListener(event, () => this.resetTimeout())
    );
    this.startTimeout();
  }

  private startTimeout() {
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => this.handleInactivity(), this.inactivityTime);
    });
  }

  private resetTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.startTimeout();
  }

  private handleInactivity() {
    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(InactivityDialogComponent, {
        width: '300px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.resetTimeout();
        } else {
          this.inactivityTimeout$.next();
          this.router.navigate(['/sr-macondo/tienda']).then(() => {
            window.location.reload();
          });
        }
      });
    });
  }

  stopMonitoring() {
    this.activityEvents.forEach((event) =>
      window.removeEventListener(event, () => this.resetTimeout())
    );
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

@Component({
  selector: 'app-inactivity-dialog',
  template: `
    <h2>Sesión Inactiva</h2>
    <p>Tu sesión está a punto de expirar. ¿Quieres continuar?</p>
    <button mat-button (click)="close(false)">No</button>
  `
})
export class InactivityDialogComponent {
  constructor(private dialogRef: MatDialog) {}

  close(continueSession: boolean) {
    this.dialogRef.closeAll();
    if (continueSession) {
      return; // No hacer nada si el usuario elige continuar
    }
  }
}
