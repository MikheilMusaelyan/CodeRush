import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  contactSubject: Subject<any> = new Subject()
  constructor() { }
  contact(bool: boolean){
    this.contactSubject.next(bool)
  }
}
