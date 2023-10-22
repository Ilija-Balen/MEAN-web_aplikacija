import { Component, OnInit } from '@angular/core';

import { AdminsService } from '../services/admins.service';
import { User } from 'src/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogged',
  templateUrl: './adminlogged.component.html',
  styleUrls: ['./adminlogged.component.css']
})
export class AdminloggedComponent implements OnInit {

  constructor(private adminsservice: AdminsService, private router:Router) { }

  ngOnInit(): void {
    this.adminsservice.findnotApprovedUsers().subscribe((usersarray:User[])=>{
      this.userslist = usersarray;
      if(this.userslist.length>0)this.postojiuser=true;
    })      
    this.adminsservice.findnotApprovedAgency().subscribe((agencyarray:User[])=>{
      this.agencylist = agencyarray;
      if(this.agencylist.length>0)this.postojiagencija=true;
    })
    this.adminsservice.findAllApprovedUsers().subscribe((users:User[])=>{
      this.sviKorisnici=users;
    })
    this.adminsservice.findAllApprovedAgency().subscribe((agencies:User[])=>{
      this.sviAgency = agencies;
    })
  }

  postojiuser:boolean;
  postojiagencija:boolean;
  userslist:User[]=[];
  agencylist:User[]=[];
  msg:string;

  deny(email){
    this.adminsservice.deny(email).subscribe(m=>{
      this.msg=m["message"];
      this.ngOnInit();
    })
  }

  accept(email){
    this.adminsservice.accept(email).subscribe(m=>{
      this.msg=m["message"];
      this.ngOnInit();
    })
  }
   
  showkorisnici:boolean;
  showagency:boolean;
  showradnici:boolean;
  sviKorisnici:User[]=[];
  sviAgency:User[]=[];
  show_korisnici(){this.showkorisnici=true; this.showagency=false; this.showradnici=false;}
  show_agency(){this.showkorisnici=false; this.showagency=true; this.showradnici=false;}
  show_radnici(){ 
    this.router.navigate(['admin-radnici']);
  }
  show_poslovi(){
    this.router.navigate(['admin-poslovi'])
  }
  azuriraj(email){
    sessionStorage.setItem("korisnik", email);
    this.router.navigate(['admin-azuriraj']);
  }

  addNew(br){
    sessionStorage.setItem("korisnik", br);
    this.router.navigate(['admin-dodaj']);
  }

  obrisi(email){
    this.adminsservice.obrisi(email).subscribe(msg=>{
      this.msg= msg["message"];
      this.ngOnInit();
    })
  }

  

}
