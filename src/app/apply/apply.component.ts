import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  usPhoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.usPhoneNumberPattern)]),
    course: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient) { }
  
  submitForm() {
    if(this.form.invalid){
      return
    }
    this.http.post('https://example.com/submit', this.form)
      .subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          this.form.reset()
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
  }
}