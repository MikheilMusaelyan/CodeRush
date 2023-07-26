import { Component } from '@angular/core';
import { MainserviceService } from './mainservice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faMessage, faPhone } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

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
  message = faMessage
  
  contact: boolean = false;
  contactAnim = 'final'
  messageOpen: boolean = false

  constructor(
    private service: MainserviceService,
    private http: HttpClient
  ){}

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

    // if(localStorage.getItem('visited') != 'true'){
    //   localStorage.setItem('visited', 'true')
    //   this.http.post(
    //     'https://drfscheduler.up.railway.app/api/sendmail/', 
    //     {
    //       name: 'visited',
    //       email: 'visited',
    //       phone: 'visited',
    //       course: 'visited'
    //     }
    //   ).subscribe(response => {}, error => {});
    // } else {
    //   this.http.post(
    //     'https://drfscheduler.up.railway.app/api/sendmail/', 
    //     {
    //       name: 'returning',
    //       email: 'returning',
    //       phone: 'returning',
    //       course: 'returning'
    //     }
    //   ).subscribe(response => {}, error => {});
    // }
  }
  
  openMessage(){
    this.messageOpen = !this.messageOpen
  }

  close(e: MouseEvent){
    this.service.contact(false)
  }

  innerClick(event: MouseEvent){
    event.stopPropagation()
    console.log('in')
  }
}
