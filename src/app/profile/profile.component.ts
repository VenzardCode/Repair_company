import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {UserInterface} from "../auth/user-interface";
import {AuthService} from "../auth/auth.service";
import {MyOrders} from "./my-orders";
import {NewOrders} from "./new-orders";
import {Orders} from "./orders";
import {DoneOrders} from "./done-orders";
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isWorker:boolean=false;
  user:UserInterface={
    name:'',
    email:'',
    phone:'',
    emailValidationRequired:false,
    role:''
  };

  constructor(public httpService: HttpService, private authService:AuthService,public dialog:MatDialog) {
    const role =this.authService.getRole();
    if (role==='admin'||role==='worker'){
      this.isWorker=true;
    }
    this.httpService.meRequest().subscribe(res=>{

      this.user=res;

      console.log(res);

    })
  }
  displayedColumnsOrders: string[] = ['id', 'item', 'defect', 'time', 'status'];
  orders!:any[];
  displayedColumnsDoneOrders: string[] = ['id', 'item', 'defect', 'time', 'status','workerName','cause','price','doneTime'];
  doneOrders!:any[];
  displayedColumnsNewOrders: string[] = ['id', 'item', 'defect', 'time','actions'];
  newOrders!:any[];
  displayedColumnsMyOrders: string[] = ['id', 'item', 'defect', 'time','customerName','customerPhone','actions'];
  myOrders!:any[];

  public getOrder(elementId:number){
    const body:any={
      id:elementId
    }
    console.log(body);
    this.httpService.getOrderSubmit(body).subscribe(res => {
      if (res) {
        this.myOrders.push({
          id:res.id,
          item:res.item,
          defect:res.defect,
          time:new Date(res.time).toLocaleString(),
          customerName:res.customerName,
          customerPhone:res.customerPhone
        });
        this.myOrders=this.myOrders.map((i:any)=>({
          id:i.id,
          item:i.item,
          defect:i.defect,
          time:i.time,
          customerName:i.customerName,
          customerPhone:i.customerPhone
        }));

      }
    }, error => {
      console.log(error);
    });
    this.newOrders = this.newOrders.filter((value,key)=>{
      return value.id != elementId;
  });
  }
  public openDialog(element:number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data:{
        id:element,
        Done:()=>{
          this.myOrders = this.myOrders.filter((value,key)=>{
            return value.id != element;
          });
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }
  ngOnInit(){
    if (!(this.isWorker)){
      this.httpService.getOrders().subscribe(res => {
        this.orders = res.orders.map((i:Orders)=>({
          id:i.id,
          item:i.item,
          defect:i.defect,
          time:new Date(i.time).toLocaleString(),
          status:i.status
        }))
        this.doneOrders = res.doneOrders.map((i:DoneOrders)=>({
          id:i.id,
          item:i.item,
          defect:i.defect,
          time:new Date(i.time).toLocaleString(),
          status:i.status,
          workerName:i.workerName,
          cause:i.cause,
          price:i.price,
          doneTime:new Date(i.doneTime).toLocaleString(),
        }))
        console.log(res);
      })
    }
    else {
      this.httpService.getNewOrders().subscribe(res => {

        this.myOrders = res.myOrders.map((i:MyOrders)=>({
          id:i.id,
          item:i.item,
          defect:i.defect,
          time:new Date(i.time).toLocaleString(),
          customerName:i.customerName,
          customerPhone:i.customerPhone
        }))
        this.newOrders = res.newOrders.map((i:NewOrders)=>({
          id:i.id,
          item:i.item,
          defect:i.defect,
          time:new Date(i.time).toLocaleString(),
        }))
        console.log(res);
      })
    }

  }

}
