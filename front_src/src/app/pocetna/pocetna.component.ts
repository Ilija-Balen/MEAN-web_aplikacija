import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { AgencyService } from '../services/agency.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private agencyservice:AgencyService, private router:Router) { }

  ngOnInit(): void {
    this.agencyservice.getallAgencies().subscribe((svi:User[])=>{
      this.agencylist=svi;
    })
  }

  

  agencylist:User[]=[];
  
  agnameSearchparam:string;
  stateSearchparam:string;
  citySearchparam:string;
  streetSearchparam:string;
  snumberSearchparam:number;
  searchParam:string;

  login(){
    this.router.navigate(['login']);
  }

  searchByAgname(){
    this.agnameSearchparam = this.searchParam;
    this.agencyservice.searchByAgname(this.agnameSearchparam).subscribe((svi:User[])=>{
      this.agencylist=svi;
      this.agnameSearchparam = null;
    })
  }

  searchByAddress(){
    let niz = this.searchParam.split(" ");
    this.stateSearchparam = niz[0];
    this.citySearchparam = niz[1];
    this.streetSearchparam = niz[2];
    this.snumberSearchparam = parseInt(niz[3]); 

    this.agencyservice.searchByAddress(this.stateSearchparam, this.citySearchparam, this.streetSearchparam, this.snumberSearchparam).subscribe((svi:User[])=>{
      this.agencylist=svi;
      this.stateSearchparam= null;
      this.citySearchparam=null;
      this.streetSearchparam= null;
      this.snumberSearchparam=null;
    })
  }

  searchByboth(){
    let niz = this.searchParam.split(" ");
    this.agnameSearchparam = niz[0];
    this.stateSearchparam = niz[1];
    this.citySearchparam = niz[2];
    this.streetSearchparam = niz[3];
    this.snumberSearchparam = parseInt(niz[4]);

    this.agencyservice.searchByboth(this.agnameSearchparam,this.stateSearchparam, this.citySearchparam, 
      this.streetSearchparam, this.snumberSearchparam).subscribe((svi:User[])=>{
        this.agencylist=svi;
    })
  }

  sortAscAgname(){
    this.agencylist.sort((a, b) => {
      let fa = a.agname.toLowerCase(),
          fb = b.agname.toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
   });
  }
  
  sortDescAgname(){
    this.agencylist.sort((a, b) => {
      let fa = a.agname.toLowerCase(),
          fb = b.agname.toLowerCase();
  
      if (fa < fb) {
          return 1;
      }
      if (fa > fb) {
          return -1;
      }
      return 0;
   });
  }

  sortAscAddress(){
    this.agencylist.sort((a, b) => {
      let fa = a.State.toLowerCase(),
          fb = b.State.toLowerCase();
      
      fa+=a.City.toLowerCase();
      fb+=b.City.toLowerCase();
      fa+=a.Street.toLowerCase();
      fb+=b.Street.toLowerCase();

      if (fa < fb) {
          return 1;
      }
      if (fa > fb) {
          return -1;
      }

      if (a.snumber< b.snumber){
        return 1;
      }

      if (a.snumber > b.snumber){
        return 1;
      }

      return 0;
   });
  }

  sortDescAddress(){
    this.agencylist.sort((a, b) => {
      let fa = a.State.toLowerCase(),
          fb = b.State.toLowerCase();
      
      fa+=a.City.toLowerCase();
      fb+=b.City.toLowerCase();
      fa+=a.Street.toLowerCase();
      fb+=b.Street.toLowerCase();

      if (fa > fb) {
          return 1;
      }
      if (fa < fb) {
          return -1;
      }

      if (a.snumber > b.snumber){
        return 1;
      }

      if (a.snumber < b.snumber){
        return 1;
      }
      
      return 0;
   });
  }

  change_page(email){
    //sessionStorage.setItem('loggeduser',JSON.stringify (userFromForm));
    sessionStorage.setItem('agencyPage',  email);
    this.router.navigate(['agency-page']);
  }

  showsortiraj:boolean=false;
  show_sortiraj(){
    this.showsortiraj=true;
  }
  showpretraga:boolean=false;
  show_pretraga(){
    this.showpretraga=true;
  }

  vrata = "data:image/png;base64,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";
 
}
