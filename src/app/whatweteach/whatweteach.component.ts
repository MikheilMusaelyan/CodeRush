import { Component, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-whatweteach',
  templateUrl: './whatweteach.component.html',
  styleUrls: ['./whatweteach.component.css']
})
export class WhatweteachComponent {
  @ViewChildren('skill') skill: any
  @ViewChild('skillWrap', {static: false}) skillWrap: any;
  images: string[] = [
    'https://clipground.com/images/html-logo-png-3.png',
    'https://s.yimg.com/fz/api/res/1.2/RQew4fbSenV3VOy7knmaJw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MTgy/https://s.yimg.com/zb/imgv1/4da0db07-1afe-3646-8c12-824eb2735948/t_500x300',
    'https://logos-download.com/wp-content/uploads/2019/01/JavaScript_Logo.png',
    'https://www.drupal.org/files/project-images/bootstrap-stack.png',
    'https://1.bp.blogspot.com/-MwJI22_Ek_0/XJQEjL9WGjI/AAAAAAAAJSs/Kd9WAGTItDoTRoaIFLE8qwOrj3STIMbfQCK4BGAYYCw/s1600/logo%2Bangular%2Bicon.png',
    'https://mikheilmusaelyan.netlify.app/assets/images/ngrx.jpeg',
    'https://tse3.mm.bing.net/th?id=OIP.6ZqA9PK6o3MiO9U1mN31LgHaHa&pid=Api&P=0',
    'https://logos-download.com/wp-content/uploads/2016/09/Node_logo_NodeJS.png',
    'https://tse1.mm.bing.net/th?id=OIP.b2Cmei85n1BpF-LRLBmcnwAAAA&pid=Api&P=0',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
    'https://www.djangoproject.com/m/img/logos/django-logo-positive.png',
    'https://www.django-rest-framework.org/img/logo.png',
    'https://1000logos.net/wp-content/uploads/2020/08/MySQL-Logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png',
    'https://mongodb-js.github.io/leaf/mongodb-leaf_256x256@2x.png',
  ]

  ngAfterViewInit(){
    let scrollSpeed = 0.1
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY * scrollSpeed;
      this.skill._results.forEach((e: any, i: number) => {
        e.nativeElement.style.transform = `translateY(${scrollPos}px)`;
      });
    });
  }
}
