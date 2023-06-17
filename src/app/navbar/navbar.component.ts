import { Component } from '@angular/core';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private service: MainserviceService){}
  contact(){
    this.service.contact(true)
  }
}
