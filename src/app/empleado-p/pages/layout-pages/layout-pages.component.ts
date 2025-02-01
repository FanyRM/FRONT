import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InactivityService } from '../../../services/inactivity.service';

@Component({
  selector: 'app-layout-pages',
  templateUrl: './layout-pages.component.html',
  styles: ``
})
export class LayoutPagesComponent implements OnInit {
  constructor(private router: Router, private inactivityService: InactivityService) {}

  ngOnInit(): void {
    this.inactivityService.inactivityTimeout$.subscribe(() => {
      this.LogOut();
    });
  }

  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('IDRol');
    
    this.router.navigate(['/sr-macondo/tienda']);
  }
}
