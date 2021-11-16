import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {UserInterface} from "../auth/user-interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:UserInterface={
    name:'',
    email:'',
    phone:'',
    emailValidationRequired:false,
    role:''
  };
  constructor(public httpService: HttpService ) {
    this.httpService.meRequest().subscribe(res=>{

      this.user=res;
      console.log(res);

    })
  }


  ngOnInit(): void {
  }

}
