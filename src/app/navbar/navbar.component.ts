
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public links:any[]=[
    {
      link:'login',
      view:'Login',
      index:0
    },
    {
      link:'register',
      view:'Register',
      index:1
    }

  ];
  activeLinkIndex = -1;
  constructor(private router: Router) {

  }



  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
    });
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

