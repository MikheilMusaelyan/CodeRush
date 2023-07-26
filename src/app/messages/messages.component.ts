import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {
  messages: any[] = [
    {
      sender: 'me',
      time: '2023-07-25 12:30 PM',
      message: 'Hello there!',
    },
    {
      sender: 'me',
      time: '2023-07-25 01:15 PM',
      message: 'Hi Alice! How are you?',
    },
    {
      sender: 'them',
      time: '2023-07-25 02:00 PM',
      message: 'I am doing well, thank you!',
    },
    // Add more dummy messages here...
    {
      sender: 'them',
      time: '2023-07-25 04:45 PM',
      message: 'Great to hear! What have you been up to?',
    },
    {
      sender: 'them',
      time: '2023-07-25 05:20 PM',
      message: 'Just working on some coding projects!',
    },
    {
      sender: 'me',
      time: '2023-07-25 06:10 PM',
      message: 'That sounds interesting!',
    },
    {
      sender: 'them',
      time: '2023-07-25 06:10 PM',
      message: 'That sounds interesting!',
    },
    {
      sender: 'them',
      time: '2023-07-25 06:10 PM',
      message: 'That sounds interesting!',
    },
    {
      sender: 'me',
      time: '2023-07-25 06:10 PM',
      message: 'That sounds interesting!',
    },
    // Add more dummy messages here...
  ];
  
  socket = io('https://socialmedia.up.railway.app')
  mySocketId = new Date().getTime()
  randomNumber = Math.floor(Math.random() * 90000) + 10000;
  randomNum = Number(String(this.mySocketId) + String(this.randomNumber))

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  ngOnInit(){
    this.socket.on('connect', () => {
      this.socket.emit('joinroom', this.randomNum)
    })

    this.socket.on('gotmessage', (info: any) => {
      this.pushToMessages(this.getCurrentTime(), 'them', info)
    })
  }

  sendMessage(){
    if(!this.messageForm.valid){
      return
    }
    this.socket.emit('sendmessage', {
      message: this.messageForm.value.message,
      socketId: this.randomNum
    })
    this.pushToMessages(this.getCurrentTime(), 'me', this.messageForm.value.message)
    this.messageForm.reset()
  }

  pushToMessages(time: any, sender: string, message: string){
    this.messages.push({
      time: time,
      sender: sender,
      message: message
    })
  }

  getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
}

