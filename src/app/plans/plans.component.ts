import { Component } from '@angular/core';
import { } from "@fortawesome/angular-fontawesome"
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  tick = faCheck
  dropdown = faArrowDown

}
