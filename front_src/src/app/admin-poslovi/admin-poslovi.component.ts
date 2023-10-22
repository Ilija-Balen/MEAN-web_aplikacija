import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../services/admins.service';
import { Posao } from 'src/model/posao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-poslovi',
  templateUrl: './admin-poslovi.component.html',
  styleUrls: ['./admin-poslovi.component.css']
})
export class AdminPosloviComponent implements OnInit {

  constructor(private adminsservice:AdminsService, private router:Router) { }

  ngOnInit(): void {
    this.adminsservice.getAllPoslovi().subscribe((svi:Posao[])=>{
      this.poslovi=svi;
    })
  }

  poslovi:Posao[]=[];
  nazad(){
    this.router.navigate(['adminlogged']);
  }
}
