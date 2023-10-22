import { Component, OnInit } from '@angular/core';
import { Posao } from 'src/model/posao';
import { User } from 'src/model/user';
import { PosaoService } from '../services/posao.service';
import { UsersService } from '../services/users.service';
import { Objekat } from 'src/model/objekat';
import { ObjekatService } from '../services/objekat.service';
import { Tacka } from 'src/model/tacka';
import { Radnik } from 'src/model/radnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treca-agencija',
  templateUrl: './treca-agencija.component.html',
  styleUrls: ['./treca-agencija.component.css']
})
export class TrecaAgencijaComponent implements OnInit {

  constructor(private posloviservice:PosaoService, private usersservice:UsersService, private objekatservice:ObjekatService,
    private router:Router) { }

  ngOnInit(): void {
    this.loggeduser = JSON.parse(sessionStorage.getItem('loggeduser'));
    this.posloviservice.getAllForAgency(this.loggeduser.email).subscribe((svi:Posao[])=>{
      this.poslovi= svi;
    })
    this.posloviservice.getAllForAgencyActive(this.loggeduser.email).subscribe((svi:Posao[])=>{
      this.aktivniposlovi = svi;
    })
    this.objekatservice.getAllRadnici(this.loggeduser.email).subscribe((svi:Radnik[])=>{
      this.radnici= svi;
    })
  }


  loggeduser:User;
  poslovi: Posao[]=[];
  aktivniposlovi: Posao[]=[];
  korisnik: User;
  objekat: Objekat;
  ponuda:number;
  message:string;

  flagpregledaj:boolean;
  showprihvati:boolean;
  izabraniposao:Posao;
  show_profil(){this.router.navigate(['agency'])}
  
  pregledaj(posao){//ovde treba da se postavi
    this.url=null;
    this.izabraniposao = posao;
    this.usersservice.getUser(posao.email).subscribe((kor:User)=>{
      this.korisnik=kor;
      this.objekatservice.getObjekatidO(posao.idO, posao.email).subscribe((obj:Objekat)=>{
        this.objekat= obj;
        this.flagpregledaj=true;
      })
    })
  }

  show_prihvati(posao){
    this.showprihvati=true;
    this.izabraniposao=posao;
    this.url=null;
  }
  prihvati(){
    if(this.izabraniposao==null || this.ponuda==null){
      this.message = "Niste uneli ponudu"
      return;
    }

    this.posloviservice.setPonuda(this.izabraniposao.idO, this.izabraniposao.email, this.ponuda).subscribe(msg=>{
      this.message=msg["message"];
      this.ponuda=null;
      this.izabraniposao=null;
      this.showprihvati=false;
      this.flagpregledaj=false;
      this.posloviservice.getAllForAgency(this.loggeduser.email).subscribe((svi:Posao[])=>{
        this.poslovi= svi;
      })
    })
  }

  odbij(posao){
    this.posloviservice.odbij(posao).subscribe(msg=>{
      this.message = msg["message"];
      this.posloviservice.getAllForAgency(this.loggeduser.email).subscribe((svi:Posao[])=>{
        this.poslovi= svi;
      })
    })
  }
  radnici:Radnik[]=[];
  url:string;
  izabraniObjekat:Objekat;
  prostorije:Tacka[]=[];
  brradnika:number=0;
  prikazi(posao){//prikazuje detalje aktivnog posla
    this.showprihvati=false;
    this.flagpregledaj=false;
    this.brradnika=0;
    this.objekatservice.getObjekatidO(posao.idO, posao.email).subscribe((o:Objekat)=>{
      this.url= o.url;
      this.izabraniObjekat=o;
      this.prostorije = o.tacke;
      this.nacrtaj();
      for (const iterator of this.prostorije) {
        if(iterator.emailR){
          this.brradnika++;
        }
      }
    })
  }

  emailFF:string;
  idPFF:number;
  dodaj(){
    if(this.emailFF==null || this.idPFF==null){
      this.message="Niste uneli email ili idProstorije";
      return;
    }

    this.objekatservice.addRadnik(this.emailFF, this.idPFF, this.izabraniObjekat).subscribe(msg=>{
      this.message=msg["message"];
      this.emailFF=null;
      this.idPFF=null;
      // this.objekatservice.getAllRadnici(this.loggeduser.email).subscribe((svi:Radnik[])=>{
      //   this.radnici= svi;
      // })
      this.ngOnInit();
    })
  }


  ps_status:number;
  ps_idO:number;
  ps_email:string;
  ps_idP:number;
  promeni_status(){
    if(this.ps_status==null || this.ps_idO==null || this.ps_email == null || this.ps_idP==null){
      this.message = "Niste uneli neki od podataka za promenu statusa";
      return;
    }

    this.objekatservice.promeni_status(this.ps_idO, this.ps_email, this.ps_idP, this.ps_status).subscribe(msg=>{
      this.message = msg["message"];
      this.ngOnInit();
    })
  }

  nacrtaj(){
    let br =0;
    for (const iterator of this.izabraniObjekat.tacke) {
      if(iterator.emailR!=null) br++;
    }
    let c= document.getElementById("treca-agencija-canvas") as HTMLCanvasElement;
    let ctx= c.getContext("2d");
    ctx.beginPath();
    ctx.clearRect(0,0, c.width, c.height);
    let img = document.getElementById("vrataID") as HTMLVideoElement;

    if(this.izabraniObjekat.tacke.length <= br){
      for (const iterator of this.izabraniObjekat.tacke) {
        if(iterator.status==2){
          //2 oznacava zavrseno
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#2cd14d";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
        }else if(iterator.status==1){
          //1 oznacava aktivno
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#cc2929";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
          
          
        }else{
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#ffffff";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
        }
      }
      //crtanje vrata
      for(const iterator of this.izabraniObjekat.vrata){
        ctx.drawImage(img, iterator.x, iterator.y);
      }
    }else{
      for(const iterator of this.izabraniObjekat.tacke){
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#e2e60e";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
      }
      for(const iterator of this.izabraniObjekat.vrata){
        ctx.drawImage(img, iterator.x, iterator.y);
      }
    }

    ctx.stroke();
  }

  vrata = "data:image/png;base64,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";
 
}
