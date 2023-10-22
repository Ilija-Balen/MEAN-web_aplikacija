import { Component, OnInit } from '@angular/core';
import { AgencyandRecensions } from 'src/model/AgencyandRecensions';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-page',
  templateUrl: './agency-page.component.html',
  styleUrls: ['./agency-page.component.css']
})
export class AgencyPageComponent implements OnInit {

  constructor(private agencyservice:AgencyService, private router:Router) { }

  ngOnInit(): void {
    let sesija = sessionStorage.getItem('agencyPage');
    let sesijaarr = sesija.split(" ");
    this.agencyemail= sesijaarr[0];
    if(sesijaarr[1]!=null)this.personalized=true;
    else this.personalized=false;
    
    sessionStorage.removeItem('agencyPage');
    
    this.agencyservice.getallRecensionsDepersonalized(this.agencyemail).subscribe((svi:AgencyandRecensions)=>{
      this.agencypage=svi;
    })
    
  }

  agencypage: AgencyandRecensions;
  agencyemail:string;
  personalized:boolean;
  show_prva(){
    this.router.navigate(['prva-klijent']);
  }
  show_druga(){
    this.router.navigate(['user']);
  }
  show_treca(){
    this.router.navigate(['treca-klijent']);
  }
  show_cetvrta(){
    this.router.navigate(['cetvrta-klijent']);
  }
}
