import { Component } from '@angular/core';
import { MainserviceService } from './mainservice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('contactAnimation', [
      state('initial', style({
        opacity: 1
      })),
      state('final', style({
        opacity: 0
      })),
      transition('initial <=> final', animate('300ms cubic-bezier(0.6, 0.18, 0, 0.98)')),
    ]),
  ]
})
export class AppComponent {
  title = 'progrush';

  fb = faFacebook
  insta = faInstagram
  phone = faPhone
  email = faMailBulk

  contact: boolean = false;
  contactAnim = 'final'

  constructor(private service: MainserviceService){}

  ngOnInit(){
    this.service.contactSubject.subscribe((bool: boolean) => {
      if(bool){
        this.contact = true;
        setTimeout(() => {
          this.contactAnim = 'initial'
        }, 10);
      } else {
        this.contactAnim = 'final'
          setTimeout(() => {
            this.contact = false;
          }, 300);
      }
    })
  }
  close(){
    this.service.contact(false)
  }
}
