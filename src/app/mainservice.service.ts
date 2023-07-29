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
  joined: boolean = false

  socket = io('https://progrushbackend.onrender.com')
  
  mySocketId = new Date().getTime()
  randomNumber = Math.floor(Math.random() * 90000) + 10000;
  randomNum = String(this.mySocketId) + 'time' + String(this.randomNumber)

  constructor(){
    this.socket.on('connect', () => {
      if(this.joined == true){
        return
      }
      this.socket.emit('joinroom', this.randomNum, cb => {
        this.joined = true
        this.joinedRoom.next(true)
      })
    })

    this.socket.on('recievemessage', (info: any) => {
      this.gotMessage.next(info)
    })

    this.socket.on('michaeljoined', () => {
      console.log('kle')
      this.sendAll.next(true)
    })
  }
  
  sendToMichael(messages: any[]){
    this.socket.emit('sendallmessages', {messages: messages, socketId: this.randomNum})
  }
  
  sendMessage(data: string){
    this.socket.emit('sendmessage', {
      message: data,
      socketId: this.randomNum
    })
  }

  contact(bool: boolean){
    this.contactSubject.next(bool)
  }

  onClick(bool: boolean) {
    this.clickSubject.next(bool)
  }  
}