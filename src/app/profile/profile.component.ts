import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {UserInterface} from "../auth/user-interface";
import {OrderInfo} from "./order-info";

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
  displayedColumns: string[] = ['id', 'item', 'defect', 'time', 'status'];
  dataSource!:any[];


  ngOnInit(){
    this.httpService.getOrders().subscribe(res => {
      this.dataSource = res.map((i:OrderInfo)=>({
        id:i.id,
        item:i.item,
        defect:i.defect,
        time:new Date(i.time).toLocaleString(),
        status:i.status
      }))
      console.log(res);
    })
  }

}
