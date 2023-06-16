import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faWallet, faRocket, faPeopleGroup, faCheckDouble, faCertificate, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('first', [
      state('initial', style({
        transform: 'translate(0, 300px)',
        opacity: 0
      })),
      state('final', style({
        tansform: 'translate(0, 0)',
        opacity: 1
      })),
      state('final-left', style({
        transform: 'translate(-70px, 0)',
        opacity: 0,
      })),
      transition('initial => final', animate('700ms cubic-bezier(0.6, 0.18, 0, 0.98)')),
      transition('final-left <=> final', [
        style({ opacity: '0.5' }),
        animate('250ms cubic-bezier(1, 0.29, 0, 0.18)')
      ])
    ]),
    trigger('second', [
      state('initial', style({
        transform: 'translateX(300px)',
        opacity: 0
      })),
      state('final', style({
        tansform: 'translateY(0)',
        opacity: 1
      })),
      transition('initial <=> final', animate('900ms cubic-bezier(1, 0.29, 0, 0.78)'))
    ]),
    trigger('mainAnim', [
      state('initial', style({
        transform: 'translateZ(0)',
        opacity: 1
      })),
      state('final', style({
        transform: 'translateZ(100px)',
        opacity: 1
      })),
      transition('initial <=> final', animate('450ms cubic-bezier(1, 0.29, 0, 0.98)'))
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit{
  firstWord: string = 'final';
  secondWord: string = 'final';
  animWrap: string = 'final';
  animEnded: boolean = true;
  wallet = faWallet;
  growth = faRocket;
  people = faPeopleGroup;
  certification = faCertificate;
  check = faCheck
  @ViewChild('second', {static: false}) second: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startUpAnim()
    this.scrollAnim()
  }

  @ViewChild('banner') banner: any;

  startUpAnim() {
    const string = ', You\'re at The Right Place';
    const indexToAddOn = 12;
    let currentIndex = 0;

    setTimeout(() => {
      this.firstWord = 'final';
      setTimeout(() => {
        setTimeout(() => {
          this.firstWord = 'final-left'
        }, 250);
        this.secondWord = 'final'

        setTimeout(() => {
          const interval = setInterval(() => {
            this.second.nativeElement.innerHTML = this.second.nativeElement.innerHTML.substring(0, indexToAddOn + currentIndex) + string[currentIndex] + '.';
            currentIndex++;
            if (currentIndex >= string.length) {
              clearInterval(interval);
              setTimeout(() => {
                this.animWrap = 'final'
                setTimeout(() => {
                  this.animEnded = true
                }, 350);
              }, 250);
            }
          }, 60);
        }, 800);
      
      }, 1200);
    }, 0);
  }

  scrollAnim() {
    let scrollSpeed = 0.5
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY * scrollSpeed;
      this.banner.nativeElement.style.transform = `translateY(${scrollPos}px)`;
    });
  }
}
