import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  contactSubject: Subject<any> = new Subject()
  clickSubject: Subject<any> = new Subject()
  gotMessage: Subject<any> = new Subject()
  joinedRoom: Subject<any> = new Subject()
  sendAll: Subject<any> = new Subject()
  joined: boolean = false;
  top: number = 0
  messageSent: boolean = false;

  socket = io('https://progrushbackend.onrender.com')
  
  mySocketId = new Date().getTime()
  randomNumber = Math.floor(Math.random() * 90000) + 10000;
  randomNum = String(this.mySocketId) + 'time' + String(this.randomNumber)

  constructor(
    private http: HttpClient
  ){
    this.socket.on('connect', () => {
      if(!localStorage.getItem('id')){
        localStorage.setItem('id', this.randomNum)
      }

      if(this.joined == true){
        return
      }
      this.socket.emit('joinroom', localStorage.getItem('id') || this.randomNum, cb => {
        this.joined = true
        this.joinedRoom.next(true)
      })
    })

    this.socket.on('recievemessage', (info: any) => {
      this.gotMessage.next(info)
    })

    this.socket.on('michaeljoined', () => {
      this.sendAll.next(true)
    })
  }

  scrollAuto(){
    window.scrollTo({
      top: this.top - 60,
      behavior: 'smooth'
    })
  }
  
  sendToMichael(messages: any[]){
    if(!localStorage.getItem('id')){
      localStorage.setItem('id', this.randomNum)
    }
    this.socket.emit('sendallmessages', {messages: messages, socketId: localStorage.getItem('id') || this.randomNum})
  }
  
  sendMessage(data: string){
    if(!localStorage.getItem('id')){
      localStorage.setItem('id', this.randomNum)
    }
    if(!this.messageSent){
      this.messageSent = true
      this.http.post(
        'https://drfscheduler.up.railway.app/api/sendmail/', 
        {
          name: 'message sent',
          email: 'id: ' + localStorage.getItem('id') || this.randomNum,
          phone: 'message sent',
          course: 'message sent',
        }
      ).subscribe(response => {}, error => {});
    }

    this.socket.emit('sendmessage', {
      message: data,
      socketId: localStorage.getItem('id') || this.randomNum
    })
  }

  contact(bool: boolean){
    this.contactSubject.next(bool)
  }

  onClick(bool: boolean) {
    this.clickSubject.next(bool)
  }  
}