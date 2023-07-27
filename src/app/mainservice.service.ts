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
  joined: boolean = false;

  socket = io('https://progrushbackend.onrender.com')
  
  mySocketId = new Date().getTime()
  randomNumber = Math.floor(Math.random() * 90000) + 10000;
  randomNum = String(this.mySocketId) + 'time' + String(this.randomNumber)

  constructor(
    private http: HttpClient
  ){
    this.addMyselfTotheBase()

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
  }

  addMyselfTotheBase(){
    this.http.post('https://progrushbackend.onrender.com/person', {socketId: this.randomNum})
    .subscribe(() => {
      console.log('darat')
    })
  }

  removeMe(){
    this.http.delete('https://progrushbackend.onrender.com/person/' + this.randomNum).subscribe(() => {})
  }
  
  sendMessage(data: string){
    this.socket.emit('sendmessage', {
      message: data,
      socketId: this.randomNum
    })

    this.http.post('https://progrushbackend.onrender.com/message', 
    {
      socketId: this.randomNum,
      message: data
    })
    .subscribe(() => {
      console.log('bobo')
    })
  }

  contact(bool: boolean){
    this.contactSubject.next(bool)
  }

  onClick(bool: boolean) {
    this.clickSubject.next(bool)
  }  
}