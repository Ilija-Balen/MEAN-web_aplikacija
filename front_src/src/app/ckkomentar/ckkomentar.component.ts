import { Component, OnInit } from '@angular/core';
import { Posao } from 'src/model/posao';
import { UsersService } from '../services/users.service';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-ckkomentar',
  templateUrl: './ckkomentar.component.html',
  styleUrls: ['./ckkomentar.component.css']
})
export class CkkomentarComponent implements OnInit {

  constructor(private agencyservice:AgencyService) { }

  ngOnInit(): void {
    this.mojPosao = JSON.parse(sessionStorage.getItem('ckkomentar'));
    sessionStorage.removeItem('ckkomentar');
    this.agencyservice.jelocenjen(this.mojPosao.email, this.mojPosao.emailAgency).subscribe(opt=>{
      if(opt["opcija"]==1){//nema komentara 
        this.flagNema=true;
        this.flagIma=false;
      }else if(opt["opcija"]==2){//ima komentar
        this.flagIma=true;
        this.flagNema=false;
      }
    })
  }

  mojPosao:Posao;
  flagIma:boolean;
  flagNema:boolean;
  tekstkomentara:string;
  ocena:number;
  message:string;
  
  obrisi(){
    this.agencyservice.obrisikomentar(this.mojPosao.email, this.mojPosao.emailAgency).subscribe(msg=>{
      this.message = msg["message"];
      this.tekstkomentara=null;
      this.ocena=null;
      this.flagIma=false;
      this.flagNema=true;
    })
  }

  izmeni(){
    this.agencyservice.izmenikomentar(this.mojPosao.email, this.mojPosao.emailAgency, this.tekstkomentara, this.ocena).subscribe(msg=>{
      this.message=msg["message"];
      this.tekstkomentara=null;
      this.ocena=null;
    })
    
  }

  dodajkomentar(){
    this.agencyservice.dodajkomentar(this.mojPosao.email, this.mojPosao.emailAgency, this.tekstkomentara, this.ocena).subscribe(msg=>{
      this.message=msg["message"];
      this.tekstkomentara=null;
      this.ocena=null;
      this.flagNema=false;
      this.flagIma=true;
    })
  }
}
