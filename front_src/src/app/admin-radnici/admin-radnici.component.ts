import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../services/admins.service';
import { Radnik } from 'src/model/radnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-radnici',
  templateUrl: './admin-radnici.component.html',
  styleUrls: ['./admin-radnici.component.css']
})
export class AdminRadniciComponent implements OnInit {

  constructor(private adminsservice:AdminsService, private router:Router) { }

  ngOnInit(): void {
    this.adminsservice.getAllRadnici().subscribe((svi:Radnik[])=>{
      this.radnici=svi;
    })
  }
  radnici:Radnik[]=[];

  emailAgencyFF:string;
  emailFF:string;
  firstnameFF:string;
  lastnameFF:string;
  phoneFF:string;
  specialityFF:string;
  msg:string;

  showaddradnici:boolean;
  show_addradnici(){this.showaddradnici=true; this.showizmeni=false;}

  dodajRadnika(){
    if(this.emailAgencyFF==null || this.emailFF==null || this.firstnameFF==null || this.lastnameFF==null||
      this.phoneFF==null || this.specialityFF==null){
        this.msg= "Niste uneli sve podatke";
        return;
      }
    
    this.adminsservice.dodajRadnika(this.emailFF, this.firstnameFF, this.lastnameFF, this.phoneFF, this.specialityFF,this.emailAgencyFF).subscribe(ms=>{
      this.msg=ms["message"];
      this.emailAgencyFF=null; this.emailFF=null; this.firstnameFF=null; this.lastnameFF=null;
      this.phoneFF=null; this.specialityFF=null;
      this.ngOnInit();
    })
  }
  showizmeni:boolean;
  emailSession:string;
  show_izmeni(email){
    this.emailSession=email;
    this.showizmeni=true;
    this.showaddradnici=false;
    //zastita od losih podataka
    this.emailAgencyFF=null; this.emailFF=null; this.firstnameFF=null; this.lastnameFF=null;
      this.phoneFF=null; this.specialityFF=null;
  }

  obrisi(email){
    this.adminsservice.obrisiRadnika(email).subscribe(ms=>{
      this.msg= ms["message"];
      this.ngOnInit();
    })
  }

  azurirajRadnika(){
    this.adminsservice.azurirajRadnika(this.emailSession, this.phoneFF, this.emailFF, this.firstnameFF, this.lastnameFF,
      this.specialityFF, this.emailAgencyFF).subscribe(ms=>{
        this.msg=ms["message"];
        this.emailAgencyFF=null; this.emailFF=null; this.firstnameFF=null; this.lastnameFF=null;
        this.phoneFF=null; this.specialityFF=null;
        this.ngOnInit();
      })
  }

  nazad(){
    this.router.navigate(['adminlogged']);
  }
}
