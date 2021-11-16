
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public  links:any[]=[]
  public linksUnAuth:any[]=[
    {
      action:()=>this.navigateTo('login'),
      view:'Login',
      index:0
    },
    {
      action:()=>this.navigateTo('register'),
      view:'Register',
      index:1
    }


  ];
  public linksAuth:any[]=[

    {
      action:()=>this.navigateTo('profile'),
      view:'Profile',
      index:0
    },
    {
      action:()=>{this.authService.logout();this.navigateTo('login')},
      view:'Log out',
      index:1
    }

  ];

  activeLinkIndex = -1;
  constructor(private router: Router,public authService: AuthService) {

  }



  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(this.links.find(tab => tab.link === '.' + this.router.url));
      this.updateLinks();
    });
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);

  }
  public updateLinks():void{
    if (this.authService.isAuthenticated()){
      this.links=this.linksAuth;
    }
    else {
      this.links=this.linksUnAuth
    }
  }
}

