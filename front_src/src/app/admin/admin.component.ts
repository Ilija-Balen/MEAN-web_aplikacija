import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Admin } from 'src/model/admin';
import {  Router } from '@angular/router';
import { AdminsService } from '../services/admins.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminssservice:AdminsService, private router: Router) { }

  ngOnInit(): void {
  }
  username:string;
  password:string;
  type:number;

  login(){
    this.adminssservice.login(this.username, this.password).subscribe((userFromForm: Admin)=>{
      if(userFromForm){
        sessionStorage.setItem('loggeduser', JSON.stringify(userFromForm));
        this.router.navigate(['adminlogged'])
      }
      else {
        alert("Admin ne postoji u bazi");
      }
    })
  }
}
