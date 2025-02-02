import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../../services/darMode.service';

@Component({
  selector: 'app-principal-sa',
  templateUrl: './principal-sa.component.html',
  styles: ``
})
export class PrincipalSaComponent implements OnInit{
  isDarkMode: boolean = false;

  constructor(private darkModeService: DarkModeService) {}
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });  
  }
  
 toggleDarkMode(): void {
  this.darkModeService.toggleDarkMode();
}


}
