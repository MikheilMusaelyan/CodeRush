import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent {
  messages: any[] = [];

  constructor(
    private service: MainserviceService
  ){
    this.service.clickSubject.subscribe((data: boolean) => {
      this.scrollToBottom()
    })
    this.service.gotMessage.subscribe((message: string) => {
      this.pushToMessages('them', message)
    })
    this.service.sendAll.subscribe(data => {
      this.sendToMichael()
    })
  }

  @ViewChild('messageScroll', {static: false}) messageScroll: any
  
  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  sendMessage(){
    if(!this.messageForm.valid){
      return
    }
    this.service.sendMessage(this.messageForm.value.message)
    this.pushToMessages('me', this.messageForm.value.message)
    this.messageForm.reset()
  }

  pushToMessages(sender: string, message: string){
    this.messages.push({
      sender: sender,
      message: message
    })
    this.scrollToBottom()
  }

  sendToMichael(){
    this.service.sendToMichael(this.messages)
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messageScroll.nativeElement.scrollTo(0, this.messageScroll.nativeElement.scrollHeight)
    }, 100);
  }
}

