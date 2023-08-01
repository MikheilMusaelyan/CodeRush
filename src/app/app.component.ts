import { Component } from '@angular/core';
import { MainserviceService } from './mainservice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk, faMessage, faMinus, faPhone } from '@fortawesome/free-solid-svg-icons';
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
  joined: boolean = false;
  firstOpened: boolean = false;

  fb = faFacebook
  insta = faInstagram
  phone = faPhone
  email = faMailBulk
  message = faMessage
  closeIcon = faMinus
  
  contact: boolean = false;
  contactAnim = 'final'
  messageOpen: boolean = false;
  amountNotRead: number = 0;

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

    this.service.gotMessage.subscribe(() => {
      if(!this.messageOpen){
        this.amountNotRead++
      }
      if(this.firstOpened == false){
        this.openMessage(true)
      }
    })

    this.service.joinedRoom.subscribe((bool:boolean) => {
      this.joined = true
    })
  }
  
  openMessage(bool: boolean, event?: MouseEvent){
    this.amountNotRead = 0
    if(this.firstOpened == false){
      this.firstOpened = true
      this.joined = false
      setTimeout(() => {
        this.joined = true
      }, 5000);
    }
    if(event){
      event.stopPropagation()
    }
    this.messageOpen = bool
    this.service.onClick(bool)
  }

  close(){
    this.service.contact(false)
  }

  innerClick(event: MouseEvent){
    event.stopPropagation()
  }
}
