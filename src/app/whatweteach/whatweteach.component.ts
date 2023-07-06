import { Component, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-whatweteach',
  templateUrl: './whatweteach.component.html',
  styleUrls: ['./whatweteach.component.css']
})
export class WhatweteachComponent {
  @ViewChildren('skill') skill: any
  @ViewChild('skillWrap', {static: false}) skillWrap: any;
  images: any[] = [
    { width: 5, scrollSpeed: 0.5, image: 'https://clipground.com/images/html-logo-png-3.png' },
    { width: 5, scrollSpeed: 0.1, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png'},
    { width: 8, scrollSpeed: -0.1, image: 'https://logos-download.com/wp-content/uploads/2019/01/JavaScript_Logo.png'},
    //bootstrap 4
    { width: 17, scrollSpeed: -0.2, image: 'https://www.drupal.org/files/project-images/bootstrap-stack.png' },
    //angular
    { width: 7, scrollSpeed: 0.24, image: 'https://1.bp.blogspot.com/-MwJI22_Ek_0/XJQEjL9WGjI/AAAAAAAAJSs/Kd9WAGTItDoTRoaIFLE8qwOrj3STIMbfQCK4BGAYYCw/s1600/logo%2Bangular%2Bicon.png' },
    //ngrx 6
    { width: 16, scrollSpeed: -0.3, image: 'https://ngrx.io/assets/images/badge.svg' },
    { width: 7, scrollSpeed: 0.05, image: 'https://tse3.mm.bing.net/th?id=OIP.6ZqA9PK6o3MiO9U1mN31LgHaHa&pid=Api&P=0' },
    //node 8
    { width: 9, scrollSpeed: 0.1, image: 'https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png' },
    { width: 1, scrollSpeed: 0.3, image: 'https://tse1.mm.bing.net/th?id=OIP.b2Cmei85n1BpF-LRLBmcnwAAAA&pid=Api&P=0' },
    { width: 12, scrollSpeed: -0.2, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png' },
    { width: 0, scrollSpeed: 0.4, image: 'https://www.djangoproject.com/m/img/logos/django-logo-negative.svg' },
    //rest 12
    { width: 1, scrollSpeed: 0.5, image: 'https://www.django-rest-framework.org/img/logo.png' },
    //mysql
    { width: 3, scrollSpeed: 0.4, image: 'https://1000logos.net/wp-content/uploads/2020/08/MySQL-Logo.png' },
    //postgres
    { width: 1, scrollSpeed: 0.2, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png' },
    { width: 1, scrollSpeed: 0.47, image: 'https://mongodb-js.github.io/leaf/mongodb-leaf_256x256@2x.png' }
  ]

  ngAfterViewInit(){
    window.addEventListener('scroll', () => {
      // if(window.innerWidth <= 900){
      //   return
      // }
      const top = this.skillWrap.nativeElement.getBoundingClientRect().top
      if(top < 350){
        this.skill._results.forEach((e: any, i: number) => {
          const scrollPos = (-top + 350) * (window.innerWidth <= 900 ? e.nativeElement.getAttribute('scrollSpeed') / 0.7 : e.nativeElement.getAttribute('scrollSpeed'));
          e.nativeElement.style.transform = `translateY(${scrollPos}px)`;
        });
      }
    });
  }

  getFloored(num: number){
    return Math.floor(Math.max(0, -num) * 100) + 1
  }

  returnWidth(i: number): number {
     if (window.innerWidth <= 500) {
      return i * 2
    } else if(window.innerWidth <= 900){
      return i * 1.5
    }
    return i
  }
}
