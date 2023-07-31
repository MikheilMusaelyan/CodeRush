import { Component, ViewChild } from '@angular/core';
import { } from "@fortawesome/angular-fontawesome"
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faArrowDown, faClock, faCheckDouble, faCertificate} from '@fortawesome/free-solid-svg-icons';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  constructor(private service: MainserviceService){}
  @ViewChild('main', {static: false}) main: any;
  tick = faCheck
  time = faClock
  date = new Date().getDate()

  contact(){
    this.service.contact(true)
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.service.top = this.main.nativeElement.offsetTop
    }, 500);
  }

}