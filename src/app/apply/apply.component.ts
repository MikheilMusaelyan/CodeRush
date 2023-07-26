import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { faMailBulk, faPhone, faX } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  usPhoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  mail = faMailBulk
  phone = faPhone
  fb = faFacebook
  x = faX;

  @ViewChild('line', {static: false}) line: any;

  message: string = ''

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.usPhoneNumberPattern)]),
    course: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpClient,
    private service: MainserviceService
  ) { 
  }
  
  submitForm() {
    if(this.form.invalid){
      return
    }
    this.http.post(
      'https://drfscheduler.up.railway.app/api/sendmail/', this.form.value
    )
    .subscribe(response => {
        this.form.reset()
        this.message = 'Congratulations, You\'ve applied! We will contact you in the next 24 hours.'
        this.resetMessage()
      },
      error => {
        this.message = 'An error occured, contact us or try again.'
        this.resetMessage()
      }
    );
  }

  close(){
    this.service.contact(false)
  }

  resetMessage(){
    setTimeout(() => {
      this.line.nativeElement.style.width = '0'
    }, 500);
    setTimeout(() => {
      this.message = ''
      setTimeout(() => {
        this.close()
      }, 200);
    }, 3500)
  }
  
}