import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { PosaoService } from '../services/posao.service';

@Component({
  selector: 'app-treca-klijent',
  templateUrl: './treca-klijent.component.html',
  styleUrls: ['./treca-klijent.component.css']
})
export class TrecaKlijentComponent implements OnInit {

  constructor(private agencyservice:AgencyService, private posaoservice:PosaoService, private router:Router) { }

  ngOnInit(): void {
    this.loggeduser = JSON.parse(sessionStorage.getItem('loggeduser'));
    //sessionStorage.removeItem('loggeduser');
  }
  
  loggeduser: User;
  agencylist:User[]=[];
  agnameSearchparam:string;
  stateSearchparam:string;
  citySearchparam:string;
  streetSearchparam:string;
  snumberSearchparam:number;
  searchParam:string;

  show_all(){
    this.agencyservice.getallAgencies().subscribe((svi:User[])=>{
      this.agencylist=svi;
      
    })

  }

  show_prva(){
    this.router.navigate(['prva-klijent']);
  }
  show_druga(){
    this.router.navigate(['druga-klijent']);
  }
  show_cetvrta(){
    this.router.navigate(['cetvrta-klijent']);
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

  showpretraga:boolean;
  showsortiraj:boolean;
  show_pretraga(){
    this.showpretraga=true;
  }
  show_sortiraj(){
    this.showsortiraj=true;
  }
  
  change_page(email){
    //sessionStorage.setItem('loggeduser',JSON.stringify (userFromForm));
    let pomocni = email + " true";
    sessionStorage.setItem('agencyPage',  pomocni);
    this.router.navigate(['agency-page']);
  }

  emailzasaradnju:string;
  show_saradnja:boolean;
  vreme:string;
  errormsg:string;
  idO:number;
  saradnja(email){
    this.emailzasaradnju= email;
    this.show_saradnja= true;
  }
  trazi_saradnju(){
    if(this.vreme!=null && this.idO!=null){
      this.show_saradnja= false;
      
      this.posaoservice.trazi_saradnju(this.idO, this.loggeduser.email, this.emailzasaradnju, this.vreme).subscribe((msg:string)=>{
          this.errormsg= msg["message"]; 
          this.idO=null;
        })
    }else{
      this.errormsg="Niste uneli vreme ili idO";
    }
    
  }
}
